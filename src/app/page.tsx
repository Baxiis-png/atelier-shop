import { DepartmentsSection } from "@/components/home/DepartmentsSection";
import { CurrentIntakeSection } from "@/components/home/CurrentIntakeSection";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { DetailStudySection } from "@/components/home/DetailStudySection";
import { VisitLabSection } from "@/components/home/VisitLabSection";
import { NotifySection } from "@/components/home/NotifySection";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";

export default function HomePage() {
  return (
    <>
      <CurrentIntakeSection />
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
