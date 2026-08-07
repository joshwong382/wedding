import { siteConfig } from "@/content/site";
import { heroTypography } from "@/content/theme";
import { SeatingSearch } from "@/components/seating-search";

export function Hero() {
  const { person1, person2, moniker, date } = siteConfig.couple;
  const { hero, sections, theme } = siteConfig;

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-start justify-center bg-neutral-900 pt-16 pb-16 sm:items-center sm:pt-0 sm:pb-0 short:pt-6 short:pb-10"
    >
      <picture className="absolute inset-0 overflow-hidden">
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
        {/* Moniker + emoji */}
        <div className="hero-element hero-delay-1 flex items-center justify-center gap-3 sm:gap-5">
          <h1
            className="text-7xl leading-none sm:text-8xl md:text-9xl short:text-6xl"
            style={heroTypography.moniker}
          >
            {moniker}
          </h1>
          <span className="text-5xl sm:text-6xl md:text-7xl short:text-4xl" aria-hidden="true">👫</span>
        </div>

        {/* Couple names */}
        <p
          className="hero-element hero-delay-1 mt-1 text-3xl sm:mt-2 sm:text-4xl md:text-5xl short:text-2xl"
          style={{ ...heroTypography.names, animationDelay: "0.8s" }}
        >
          {person1} & {person2}
        </p>

        {/* Date */}
        <p
          className="hero-element hero-delay-1 mt-3 text-xs sm:mt-4 sm:text-base md:text-lg short:mt-2 short:text-xs"
          style={{ ...heroTypography.date, animationDelay: "1.1s" }}
        >
          {date}
        </p>

        <div className="hero-element hero-delay-2 mt-6 short:mt-3 inline-block border-y border-white/80 px-4 py-3">
          <h3 className="text-sm font-bold uppercase tracking-[2px] sm:text-base">
            {sections.seatingSearch.heading}
          </h3>
        </div>

        <div className="hero-element hero-delay-3 mt-6 short:mt-3">
          <SeatingSearch />
        </div>
      </div>
    </section>
  );
}
