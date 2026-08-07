import { Hero } from "@/components/hero";
import { Devo } from "@/components/devo";
import { LanguageToggle } from "@/components/language-toggle";
import { MenuSection } from "@/components/menu-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <LanguageToggle />
      <Devo />
      <MenuSection />
      <Footer />
    </>
  );
}
