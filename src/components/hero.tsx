import { siteConfig } from "@/content/site";
import { SeatingSearch } from "@/components/seating-search";

export function Hero() {
  const { person1, person2 } = siteConfig.couple;
  const { hero, sections, theme } = siteConfig;

  return (
    <section
      id="home"
      className="relative flex min-h-[110vh] items-center justify-center overflow-hidden bg-neutral-900"
    >
      <picture className="absolute inset-0">
        <source srcSet={hero.mobileImage} media="(max-width: 768px)" />
        <img
          src={hero.desktopImage}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.imagePosition }}
        />
      </picture>

      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: theme.heroOverlay }}
      />

      <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center text-white">
        <h1 className="hero-element hero-delay-1 font-display text-5xl leading-tight sm:text-7xl md:text-8xl">
          {person1} & {person2}
        </h1>

        <div className="hero-element hero-delay-2 mt-6 inline-block border-y border-white/80 px-4 py-3">
          <h3 className="text-sm font-bold uppercase tracking-[2px] sm:text-base">
            {sections.seatingSearch.heading}
          </h3>
        </div>

        <div className="hero-element hero-delay-3 mt-6">
          <SeatingSearch />
        </div>
      </div>
    </section>
  );
}
