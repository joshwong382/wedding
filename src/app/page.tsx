import { Hero } from "@/components/hero";
import { Devo } from "@/components/devo";
import { LanguageToggle } from "@/components/language-toggle";
import { MenuSection } from "@/components/menu-section";
import { Footer } from "@/components/footer";
import { SeatingChartImage } from "@/components/seating-chart-image";

export default function Home() {
  return (
    <>
      <Hero />
      <SeatingChartImage />
      <LanguageToggle />
      <Devo />
      <MenuSection />
      <Footer />
    </>
  );
}
