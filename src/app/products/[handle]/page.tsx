import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDetail } from "@/components/ProductDetail";
import {
  getLiveProductByHandle,
  getLiveRelatedProducts,
} from "@/lib/inventory";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getLiveProductByHandle(handle);

  if (!product) notFound();

  const related = await getLiveRelatedProducts(product);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-8 md:py-20">
      <ProductDetail product={product} />

      {related.length > 0 && (
        <div className="mt-24 border-t border-carbon/15 pt-14">
          <p className="label-lab text-carbon/40">Related specimens</p>
          <h2 className="heading-brutal mt-3 text-3xl md:text-5xl">
            You may also like
          </h2>
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  );
}
