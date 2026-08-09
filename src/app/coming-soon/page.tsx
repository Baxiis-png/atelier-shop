import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col items-center justify-center px-4 py-28 text-center md:px-8">
      <p className="label-lab text-carbon/40">Department</p>
      <h1 className="heading-brutal mt-6 max-w-3xl text-4xl leading-[1.05] md:text-6xl lg:text-[72px]">
        We know you want it ;) patience is key.
      </h1>
      <Link
        href="/#departments"
        className="mt-12 inline-block border border-carbon px-10 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
      >
        Back to departments
      </Link>
    </div>
  );
}
