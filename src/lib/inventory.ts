import { revalidatePath } from "next/cache";
import { shopifyAdminFetch } from "@/lib/shopify";
import {
  applyInventory,
  getRelatedProducts,
  products,
  seedInventory,
  type InventoryMap,
  type Product,
} from "@/lib/products";

const NAMESPACE = "ape_lab";
const KEY = "inventory";

type Metafield = {
  id: number;
  value?: string;
};

function mergeInventory(seed: InventoryMap, stored: InventoryMap): InventoryMap {
  const merged: InventoryMap = {};
  for (const productId of Object.keys(seed)) {
    merged[productId] = { ...seed[productId], ...(stored[productId] ?? {}) };
  }
  return merged;
}

function parseInventory(value: string | undefined): InventoryMap | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as InventoryMap;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

async function getInventoryMetafield(): Promise<Metafield | null> {
  const result = await shopifyAdminFetch<{ metafields?: Metafield[] }>(
    `/metafields.json?namespace=${NAMESPACE}&key=${KEY}`,
  );
  if (!result.ok) {
    console.error("[inventory] read failed:", result.error);
    return null;
  }
  return result.data.metafields?.[0] ?? null;
}

async function writeInventory(
  inventory: InventoryMap,
  metafieldId?: number,
): Promise<boolean> {
  const metafield = {
    namespace: NAMESPACE,
    key: KEY,
    type: "json",
    value: JSON.stringify(inventory),
  };

  const result = metafieldId
    ? await shopifyAdminFetch(`/metafields/${metafieldId}.json`, {
        method: "PUT",
        body: JSON.stringify({ metafield }),
      })
    : await shopifyAdminFetch("/metafields.json", {
        method: "POST",
        body: JSON.stringify({ metafield }),
      });

  if (!result.ok) {
    console.error("[inventory] write failed:", result.error);
    return false;
  }
  return true;
}

export async function getInventory(): Promise<InventoryMap> {
  const seed = seedInventory();
  const metafield = await getInventoryMetafield();
  const stored = parseInventory(metafield?.value);

  if (!stored) {
    await writeInventory(seed, metafield?.id);
    return seed;
  }

  return mergeInventory(seed, stored);
}

export async function getLiveProducts(): Promise<Product[]> {
  const inventory = await getInventory();
  return products.map((product) => applyInventory(product, inventory));
}

export async function getLiveProductByHandle(
  handle: string,
): Promise<Product | undefined> {
  const live = await getLiveProducts();
  return live.find((product) => product.handle === handle);
}

export async function getLiveRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const inventory = await getInventory();
  return getRelatedProducts(product, limit).map((related) =>
    applyInventory(related, inventory),
  );
}

async function mutateStock(
  items: Array<{ productId: string; size: string; quantity: number }>,
  mode: "reserve" | "restore",
): Promise<{ ok: true } | { ok: false; error: string }> {
  const metafield = await getInventoryMetafield();
  const seed = seedInventory();
  const inventory = mergeInventory(seed, parseInventory(metafield?.value) ?? {});

  if (mode === "reserve") {
    for (const item of items) {
      const have = inventory[item.productId]?.[item.size] ?? 0;
      if (!item.productId || !item.size || have < item.quantity) {
        return {
          ok: false,
          error: `Size ${item.size || "?"} is no longer available. Refresh the page and try again.`,
        };
      }
    }
    for (const item of items) {
      inventory[item.productId][item.size] -= item.quantity;
    }
  } else {
    for (const item of items) {
      if (!inventory[item.productId]) inventory[item.productId] = {};
      inventory[item.productId][item.size] =
        (inventory[item.productId][item.size] ?? 0) + item.quantity;
    }
  }

  const saved = await writeInventory(inventory, metafield?.id);
  if (!saved) {
    return {
      ok: false,
      error: "Could not update stock. Try again in a moment.",
    };
  }

  revalidatePath("/");
  for (const product of products) {
    revalidatePath(`/products/${product.handle}`);
  }

  return { ok: true };
}

export function reserveStock(
  items: Array<{ productId: string; size: string; quantity: number }>,
) {
  return mutateStock(items, "reserve");
}

export function restoreStock(
  items: Array<{ productId: string; size: string; quantity: number }>,
) {
  return mutateStock(items, "restore");
}
