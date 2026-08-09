import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/products";

export function CatalogueSection() {
  return (
    <section
      id="catalogue"
      className="scroll-mt-24 bg-cream py-20 md:py-28 lg:scroll-mt-[194px]"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-col items-start gap-4 border-b border-carbon/15 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:pb-8">
          <div>
            <p className="label-lab text-carbon/40">Index 02</p>
            <h2 className="heading-brutal mt-3 text-5xl md:text-7xl lg:text-[84px]">
              The Catalogue
            </h2>
          </div>
          <p className="shrink-0 pb-1.5 font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40 md:text-[10px]">
            {products.length} specimens on floor
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <ProductGrid products={products} />
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="#departments"
            className="border border-carbon px-10 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors duration-300 hover:bg-carbon hover:text-cream"
          >
            Browse all departments
          </Link>
        </div>
      </div>
    </section>
  );
}
