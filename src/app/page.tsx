import { Hero } from "@/components/hero";
import { Devo } from "@/components/devo";
import { MenuSection } from "@/components/menu-section";
import { Footer } from "@/components/footer";
import { SeatingChartImage } from "@/components/seating-chart-image";

export default function Home() {
  return (
    <>
      <Hero />
      <SeatingChartImage />
      <Devo />
      <MenuSection />
      <Footer />
    </>
  );
}
