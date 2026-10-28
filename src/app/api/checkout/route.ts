import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { reserveStock, restoreStock } from "@/lib/inventory";
import { shopifyAdminFetch } from "@/lib/shopify";

type CheckoutItem = {
  productId: string;
  handle: string;
  title: string;
  brand: string;
  colorway: string;
  size: string;
  price: number;
  quantity: number;
};

type CheckoutBody = {
  city: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  items: CheckoutItem[];
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  const firstName = parts[0] || "Customer";
  const lastName = parts.slice(1).join(" ") || "—";
  return { firstName, lastName };
}

function toShopifyPrice(cents: number) {
  return (cents / 100).toFixed(2);
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const city = body.city?.trim();
  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim().toLowerCase();
  const address = body.address?.trim();
  const items = Array.isArray(body.items) ? body.items : [];

  if (
    !city ||
    !name ||
    name.length < 2 ||
    !phone ||
    phone.length < 6 ||
    !email?.includes("@") ||
    !address ||
    address.length < 4 ||
    items.length === 0
  ) {
    return NextResponse.json({ error: "Missing or invalid order details" }, { status: 400 });
  }

  for (const item of items) {
    if (
      !item?.title ||
      !item?.size ||
      typeof item.price !== "number" ||
      item.price <= 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 });
    }
  }

  const stockItems = items.map((item) => ({
    productId: item.productId,
    size: item.size,
    quantity: item.quantity,
  }));

  const reserved = await reserveStock(stockItems);
  if (!reserved.ok) {
    return NextResponse.json({ error: reserved.error }, { status: 409 });
  }

  const { firstName, lastName } = splitName(name);

  const lineItems = items.map((item) => ({
    title: `${item.title} — ${item.colorway} (${item.size})`,
    price: toShopifyPrice(item.price),
    quantity: item.quantity,
    requires_shipping: true,
    properties: [
      { name: "Brand", value: item.brand },
      { name: "Colorway", value: item.colorway },
      { name: "Size", value: item.size },
      { name: "Handle", value: item.handle },
      { name: "Product ID", value: item.productId },
    ],
  }));

  const noteLines = [
    "Order from APE LAB website",
    `City: ${city}`,
    `Phone: ${phone}`,
    "Payment: Cash on delivery",
    "Shipping: FREE — 48–72h",
  ];

  // Reuse existing Shopify customer by email so repeat orders
  // (same phone) don't fail with "phone_number has already been taken".
  let customerId: number | undefined;
  const customerSearch = await shopifyAdminFetch<{
    customers?: Array<{ id: number; email?: string }>;
  }>(`/customers/search.json?query=${encodeURIComponent(`email:${email}`)}&limit=1`);

  if (customerSearch.ok && customerSearch.data.customers?.[0]?.id) {
    customerId = customerSearch.data.customers[0].id;
  }

  const payload = {
    order: {
      email,
      phone,
      financial_status: "pending",
      send_receipt: false,
      send_fulfillment_receipt: false,
      tags: "ape-lab, website, COD",
      note: noteLines.join("\n"),
      currency: process.env.SHOPIFY_CURRENCY || "MAD",
      line_items: lineItems,
      shipping_address: {
        first_name: firstName,
        last_name: lastName,
        address1: address,
        city,
        country_code: "MA",
        phone,
      },
      billing_address: {
        first_name: firstName,
        last_name: lastName,
        address1: address,
        city,
        country_code: "MA",
        phone,
      },
      shipping_lines: [
        {
          title: "Free shipping — 48–72h",
          price: "0.00",
          code: "FREE",
        },
      ],
      // Attach to existing customer when found. Never nest a full
      // customer create — Shopify rejects duplicate phone numbers.
      ...(customerId
        ? { customer_id: customerId }
        : {
            customer: {
              first_name: firstName,
              last_name: lastName,
              email,
            },
          }),
    },
  };

  const result = await shopifyAdminFetch<{
    order?: { id: number; name: string; order_number?: number };
  }>("/orders.json", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    await restoreStock(stockItems);
    const raw = result.error || "Failed to create Shopify order";
    const friendly =
      /phone_number.*already been taken/i.test(raw) ||
      /customer\.phone_number/i.test(raw)
        ? "This phone number is already linked to another customer in Shopify. Try again, or use the same email as your previous order."
        : raw;

    return NextResponse.json(
      { error: friendly },
      { status: result.status >= 400 ? result.status : 502 },
    );
  }

  const order = result.data.order;
  if (!order?.id) {
    await restoreStock(stockItems);
    return NextResponse.json(
      { error: "Shopify did not return an order" },
      { status: 502 },
    );
  }

  const subtotalCents = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const emailResult = await sendOrderConfirmationEmail({
    to: email,
    customerName: name,
    phone,
    city,
    address,
    orderName: order.name,
    items: items.map((item) => ({
      title: item.title,
      colorway: item.colorway,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    })),
    subtotalCents,
  });

  if (!emailResult.ok) {
    console.error("[checkout] order email failed:", emailResult.error);
  }

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    orderName: order.name,
    orderNumber: order.order_number,
    emailSent: emailResult.ok,
  });
}
