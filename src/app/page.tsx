import { DepartmentsSection } from "@/components/home/DepartmentsSection";
import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { DetailStudySection } from "@/components/home/DetailStudySection";
import { VisitLabSection } from "@/components/home/VisitLabSection";
import { NotifySection } from "@/components/home/NotifySection";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <DepartmentsSection />
      <CatalogueSection />
      <DetailStudySection />
      <VisitLabSection />
      <NotifySection />
      <OrderSuccessModal />
    </>
  );
}
