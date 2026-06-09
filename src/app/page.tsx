import { Hero } from "@/components/hero";
import { PhotoBooth } from "@/components/photo-booth";
import { MenuSection } from "@/components/menu-section";
import { Footer } from "@/components/footer";
import { SeatingChartImage } from "@/components/seating-chart-image";

export default function Home() {
  return (
    <>
      <Hero />
      <PhotoBooth />
      <MenuSection />
      <Footer />
      <SeatingChartImage />
    </>
  );
}
