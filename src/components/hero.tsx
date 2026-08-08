"use client";

import { useLayoutEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { heroTypography } from "@/content/theme";
import { SeatingSearch } from "@/components/seating-search";

export function Hero() {
  const [skipAnim, setSkipAnim] = useState(false);
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem("seating-guest")) setSkipAnim(true);
    } catch { /* SSR or private browsing */ }
  }, []);

  const anim = (...classes: string[]) =>
    skipAnim ? classes[0]! : classes.join(" ");

  const { person1, person2, moniker, date } = siteConfig.couple;
  const { hero, sections, theme } = siteConfig;

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center bg-neutral-900 pt-16 pb-16 sm:pt-16 sm:pb-0 short:pt-6 short:pb-10"
    >
      <picture className="absolute inset-0 overflow-hidden">
        <source srcSet={hero.mobileImage} media="(max-width: 768px)" type="image/webp" />
        <source srcSet={hero.desktopImage} type="image/webp" />
        <img
          src={hero.desktopImage}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.imagePosition }}
          fetchPriority="high"
        />
      </picture>

      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: theme.heroOverlay }}
      />

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-1 flex-col px-4 text-center text-white">
        {/* Moniker + emoji */}
        <div className={anim("flex items-center justify-center gap-3 sm:gap-5", "hero-element hero-delay-1")}>
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
          className={anim("mt-1 text-3xl sm:mt-2 sm:text-4xl md:text-5xl short:text-2xl", "hero-element hero-delay-1")}
          style={skipAnim ? heroTypography.names : { ...heroTypography.names, animationDelay: "0.8s" }}
        >
          {person1} & {person2}
        </p>

        {/* Date */}
        <p
          className={anim("mt-3 text-xs sm:mt-4 sm:text-base md:text-lg short:mt-2 short:text-xs", "hero-element hero-delay-1")}
          style={skipAnim ? heroTypography.date : { ...heroTypography.date, animationDelay: "1.1s" }}
        >
          {date}
        </p>

        <div className={anim("mt-6 short:mt-3 inline-block border-y border-white/80 px-4 py-3", "hero-element hero-delay-2")}>
          <h3 className="text-sm font-bold uppercase tracking-[2px] sm:text-base">
            {sections.seatingSearch.heading}
          </h3>
        </div>

        <div className={anim("mt-6 short:mt-3 flex flex-1 flex-col", "hero-element hero-delay-3")}>
          <SeatingSearch />
        </div>
      </div>
    </section>
  );
}
