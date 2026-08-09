import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} index={index} />
        </li>
      ))}
    </ul>
  );
}
