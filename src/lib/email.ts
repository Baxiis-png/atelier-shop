import { Resend } from "resend";

export type OrderEmailItem = {
  title: string;
  colorway: string;
  size: string;
  price: number;
  quantity: number;
};

export type OrderEmailPayload = {
  to: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  orderName?: string;
  items: OrderEmailItem[];
  subtotalCents: number;
};

function formatMad(cents: number) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.EMAIL_FROM?.trim() || "APE LAB <onboarding@resend.dev>";
  const replyTo = process.env.EMAIL_REPLY_TO?.trim();
  const notifyTo =
    process.env.NOTIFY_TO?.trim() || replyTo || "ape.lab@outlook.com";

  if (!apiKey) return null;
  return { apiKey, from, replyTo, notifyTo };
}

export function isEmailConfigured() {
  return Boolean(getEmailConfig());
}

export async function sendOrderConfirmationEmail(
  payload: OrderEmailPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const config = getEmailConfig();
  if (!config) {
    return {
      ok: false,
      error: "Email is not configured. Set RESEND_API_KEY (and optionally EMAIL_FROM).",
    };
  }

  const lines = payload.items.map(
    (item) =>
      `• ${item.title} — ${item.colorway} / Size ${item.size} × ${item.quantity} — ${formatMad(item.price * item.quantity)}`,
  );

  const orderLabel = payload.orderName || "your order";
  const subject = `APE LAB — Order confirmed (${orderLabel})`;

  const text = [
    `Hi ${payload.customerName},`,
    "",
    "Thank you for your order at APE LAB.",
    `Your order ${orderLabel} has been received.`,
    "",
    "Items:",
    ...lines,
    "",
    `Subtotal: ${formatMad(payload.subtotalCents)}`,
    "Shipping: FREE — 48–72h",
    "Payment: Cash on delivery",
    "",
    "Delivery details:",
    `Name: ${payload.customerName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.to}`,
    `City: ${payload.city}`,
    `Address: ${payload.address}`,
    "",
    "We will contact you ASAP to confirm delivery.",
    "",
    "— APE LAB",
    "https://apelab.store",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.5;max-width:560px">
      <p>Hi ${escapeHtml(payload.customerName)},</p>
      <p>Thank you for your order at <strong>APE LAB</strong>.</p>
      <p>Your order <strong>${escapeHtml(orderLabel)}</strong> has been received.</p>
      <p style="margin:20px 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#666">Items</p>
      <ul style="padding-left:18px;margin:0">
        ${payload.items
          .map(
            (item) =>
              `<li style="margin-bottom:8px">${escapeHtml(item.title)} — ${escapeHtml(item.colorway)} / Size ${escapeHtml(item.size)} × ${item.quantity} — <strong>${escapeHtml(formatMad(item.price * item.quantity))}</strong></li>`,
          )
          .join("")}
      </ul>
      <p style="margin-top:16px"><strong>Subtotal:</strong> ${escapeHtml(formatMad(payload.subtotalCents))}<br/>
      <strong>Shipping:</strong> FREE — 48–72h<br/>
      <strong>Payment:</strong> Cash on delivery</p>
      <p style="margin:20px 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#666">Delivery</p>
      <p>
        ${escapeHtml(payload.customerName)}<br/>
        ${escapeHtml(payload.phone)}<br/>
        ${escapeHtml(payload.to)}<br/>
        ${escapeHtml(payload.city)}<br/>
        ${escapeHtml(payload.address)}
      </p>
      <p>We will contact you ASAP to confirm delivery.</p>
      <p style="margin-top:24px">— APE LAB<br/><a href="https://apelab.store">apelab.store</a></p>
    </div>
  `;

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send({
      from: config.from,
      to: payload.to,
      ...(config.replyTo ? { replyTo: config.replyTo } : {}),
      subject,
      text,
      html,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return { ok: false, error: message };
  }
}

export type NotifySignupPayload = {
  email?: string;
  phone?: string;
  interests: string[];
};

const INTEREST_LABELS: Record<string, string> = {
  discounts: "Discounts",
  arrivals: "New arrivals",
  availability: "Availabilities",
};

export async function sendNotifySignupEmails(
  payload: NotifySignupPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const config = getEmailConfig();
  if (!config) {
    return {
      ok: false,
      error: "Email is not configured. Set RESEND_API_KEY.",
    };
  }

  const interestList = payload.interests
    .map((id) => INTEREST_LABELS[id] || id)
    .join(", ");
  const email = payload.email?.trim() || "";
  const phone = payload.phone?.trim() || "";
  const who = email || phone;

  try {
    const resend = new Resend(config.apiKey);

    const alert = await resend.emails.send({
      from: config.from,
      to: config.notifyTo,
      ...(email ? { replyTo: email } : {}),
      subject: `APE LAB — Notify signup (${who})`,
      text: [
        "New Notify me signup",
        "",
        `Email: ${email || "—"}`,
        `Phone: ${phone || "—"}`,
        `Interests: ${interestList || "—"}`,
        `When: ${new Date().toISOString()}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.5">
          <p><strong>New Notify me signup</strong></p>
          <p>Email: ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "—"}</p>
          <p>Phone: ${escapeHtml(phone || "—")}</p>
          <p>Interests: ${escapeHtml(interestList || "—")}</p>
        </div>
      `,
    });

    if (alert.error) {
      return { ok: false, error: alert.error.message };
    }

    if (!email) return { ok: true };

    const confirm = await resend.emails.send({
      from: config.from,
      to: email,
      ...(config.replyTo ? { replyTo: config.replyTo } : {}),
      subject: "APE LAB — You're on the notify list",
      text: [
        "You're on the APE LAB notify list.",
        "",
        `We'll email you about: ${interestList || "lab updates"}.`,
        "",
        "— APE LAB",
        "https://apelab.store",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.5;max-width:560px">
          <p>You're on the <strong>APE LAB</strong> notify list.</p>
          <p>We'll email you about: <strong>${escapeHtml(interestList || "lab updates")}</strong>.</p>
          <p style="margin-top:24px">— APE LAB<br/><a href="https://apelab.store">apelab.store</a></p>
        </div>
      `,
    });

    if (confirm.error) {
      console.error("[notify] subscriber confirm failed:", confirm.error.message);
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send notify email";
    return { ok: false, error: message };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
