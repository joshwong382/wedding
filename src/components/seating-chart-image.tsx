"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { loadSavedGuest } from "@/lib/seating-search";

export function SeatingChartImage() {
  const [collapsed, setCollapsed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Hydrate collapsed state from localStorage after mount
  useEffect(() => {
    if (loadSavedGuest()) setCollapsed(true);
  }, []);

  useEffect(() => {
    function onGuestSelected() {
      setCollapsed(true);
    }
    function onGuestCleared() {
      setCollapsed(false);
    }
    function onToggle() {
      setCollapsed((prev) => {
        if (prev) {
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        return !prev;
      });
    }
    window.addEventListener("seating-guest-selected", onGuestSelected);
    window.addEventListener("seating-guest-cleared", onGuestCleared);
    window.addEventListener("seating-chart-toggle", onToggle);
    return () => {
      window.removeEventListener("seating-guest-selected", onGuestSelected);
      window.removeEventListener("seating-guest-cleared", onGuestCleared);
      window.removeEventListener("seating-chart-toggle", onToggle);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%)" }}>
      <div className="mx-auto max-w-[95%] text-center sm:max-w-[85%]">
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: collapsed ? "0px" : "80svh",
            opacity: collapsed ? 0 : 1,
          }}
        >
          <img
            src="/images/seating-chart.png"
            alt="Full seating chart listing every table and guest"
            className="mx-auto h-auto w-full max-w-xl max-h-[70svh] object-contain"
            width={1836}
            height={2376}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
