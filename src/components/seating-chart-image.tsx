"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "seating-guest";

function hasSelectedGuest() {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    const { name, tableId } = JSON.parse(saved);
    return !!(name && tableId);
  } catch {
    return false;
  }
}

export function SeatingChartImage() {
  const [collapsed, setCollapsed] = useState(() => hasSelectedGuest());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onGuestSelected() {
      setCollapsed(true);
    }
    function onToggle() {
      setCollapsed((prev) => {
        if (prev) {
          // Expanding — scroll into view after transition
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        return !prev;
      });
    }
    window.addEventListener("seating-guest-selected", onGuestSelected);
    window.addEventListener("seating-chart-toggle", onToggle);
    return () => {
      window.removeEventListener("seating-guest-selected", onGuestSelected);
      window.removeEventListener("seating-chart-toggle", onToggle);
    };
  }, []);

  return (
    <section ref={sectionRef}>
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
