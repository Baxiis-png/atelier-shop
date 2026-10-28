export type ProductSize = {
  size: string;
  inStock: boolean;
  quantity?: number;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  brand: string;
  colorway: string;
  price: number;
  compareAt?: number;
  badge?: string;
  images: string[];
  sizes: ProductSize[];
  description: string;
  category: string;
  colorHex?: string;
};

export type CartItem = {
  productId: string;
  handle: string;
  title: string;
  brand: string;
  colorway: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

const currency = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(cents: number): string {
  return currency.format(cents / 100);
}

export const products: Product[] = [
  {
    id: "1",
    handle: "abc-camo-side-big-ape-head-tee-white",
    title: "ABC Camo Side Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "White / Blue Camo",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#F5F5F0",
    description:
      "Heavyweight cotton crewneck with the oversized side-placed big ape head in blue ABC camo. Original camo hang tag and woven hem label present. Seven-point authentication log included.",
    images: [
      "/products/abc-camo-white-1.png",
      "/products/abc-camo-white-2.png",
    ],
    sizes: [
      { size: "S", inStock: true, quantity: 1 },
      { size: "M", inStock: true, quantity: 1 },
      { size: "L", inStock: false, quantity: 0 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "2",
    handle: "abc-camo-side-big-ape-head-tee-black",
    title: "ABC Camo Side Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "Black / Blue Camo",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#111111",
    description:
      "The black colourway of the side big ape head tee, printed in blue ABC camo. Ribbed crew neck, chain-stitched hem, woven ape head tab at the side seam.",
    images: [
      "/products/abc-camo-black-1.png",
      "/products/abc-camo-black-2.png",
      "/products/abc-camo-black-3.png",
    ],
    sizes: [
      { size: "S", inStock: false, quantity: 0 },
      { size: "M", inStock: true, quantity: 1 },
      { size: "L", inStock: true, quantity: 1 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "3",
    handle: "sakura-big-ape-head-tee-white",
    title: "Sakura Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "White / Pink",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#F5F5F0",
    description:
      "Cherry blossom big ape head graphic with falling petals and *A BATHING APE® wordmark beneath. Spring seasonal release, deadstock condition.",
    images: [
      "/products/sakura-white-1.png",
      "/products/sakura-white-2.png",
      "/products/sakura-white-3.png",
    ],
    sizes: [
      { size: "S", inStock: true, quantity: 1 },
      { size: "M", inStock: true, quantity: 1 },
      { size: "L", inStock: true, quantity: 1 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "4",
    handle: "sakura-big-ape-head-tee-black",
    title: "Sakura Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "Black / Pink",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#111111",
    description:
      "Black bodied sakura big ape head tee with mint-tinted face detail and a small blossom ape logo at the upper back.",
    images: [
      "/products/sakura-black-1.png",
      "/products/sakura-black-2.png",
      "/products/sakura-black-3.png",
    ],
    sizes: [
      { size: "S", inStock: false, quantity: 0 },
      { size: "M", inStock: true, quantity: 1 },
      { size: "L", inStock: false, quantity: 0 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "5",
    handle: "snakeskin-big-ape-head-tee",
    title: "Snakeskin Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "White / Python",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#8A8A85",
    description:
      "Python-fill big ape head with a Baby Milo® seated on top in orange. Registration mark below the graphic. Archive piece, single run.",
    images: [
      "/products/snake-white-1.png",
      "/products/snake-white-2.png",
    ],
    sizes: [
      { size: "S", inStock: true, quantity: 1 },
      { size: "M", inStock: true, quantity: 2 },
      { size: "L", inStock: true, quantity: 1 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "6",
    handle: "check-big-ape-head-tee-black",
    title: "Check Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "Black / Grey Check",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#111111",
    description:
      "Greyscale tartan check fill big ape head, centred front, with BY BATHING APE® printed across the lower back panel.",
    images: [
      "/products/check-black-1.png",
      "/products/check-black-2.png",
      "/products/check-black-3.png",
    ],
    sizes: [
      { size: "S", inStock: true, quantity: 1 },
      { size: "M", inStock: true, quantity: 2 },
      { size: "L", inStock: true, quantity: 1 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "7",
    handle: "pink-camo-big-ape-head-tee-white",
    title: "Pink Camo Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "White / Pink Camo",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#F5F5F0",
    description:
      "White crewneck with a centred big ape head filled in pink and magenta camo, chain graphic across the brow, and script mark at the lower edge. Original hang tag present. Seven-point authentication log included.",
    images: [
      "/products/pink-camo-white-1.png",
      "/products/pink-camo-white-2.png",
      "/products/pink-camo-white-3.png",
    ],
    sizes: [
      { size: "S", inStock: false, quantity: 0 },
      { size: "M", inStock: false, quantity: 0 },
      { size: "L", inStock: false, quantity: 0 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
  {
    id: "8",
    handle: "fuji-sakura-big-ape-head-tee-white",
    title: "Fuji Sakura Big Ape Head Tee",
    brand: "A BATHING APE",
    colorway: "White / Blue Camo × Sakura",
    price: 29900,
    compareAt: 89900,
    badge: "NEW IN",
    category: "tees",
    colorHex: "#F5F5F0",
    description:
      "White crewneck with a centred big ape head — blue camo upper face over a Mount Fuji and sakura landscape fill, falling blossom petals, and a pink BAPE® wordmark on the upper back. Size S neck label. Original hang tag present.",
    images: [
      "/products/fuji-sakura-white-1.png",
      "/products/fuji-sakura-white-2.png",
      "/products/fuji-sakura-white-3.png",
    ],
    sizes: [
      { size: "S", inStock: false, quantity: 0 },
      { size: "M", inStock: false, quantity: 0 },
      { size: "L", inStock: false, quantity: 0 },
      { size: "XL", inStock: false, quantity: 0 },
    ],
  },
];

export type InventoryMap = Record<string, Record<string, number>>;

export function seedInventory(): InventoryMap {
  const map: InventoryMap = {};
  for (const product of products) {
    map[product.id] = {};
    for (const size of product.sizes) {
      map[product.id][size.size] = size.quantity ?? (size.inStock ? 1 : 0);
    }
  }
  return map;
}

export function applyInventory(
  product: Product,
  inventory: InventoryMap,
): Product {
  const qtyBySize = inventory[product.id];
  return {
    ...product,
    sizes: product.sizes.map((size) => {
      const quantity = qtyBySize?.[size.size] ?? size.quantity ?? 0;
      return { ...size, quantity, inStock: quantity > 0 };
    }),
  };
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
