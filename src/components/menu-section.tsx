"use client";

import { useState, useEffect } from "react";
import { menu, type Course } from "@/content/menu";
import { siteConfig } from "@/content/site";

type MenuKey = "regular" | "vegetarian";

function CourseRow({ course }: { course: Course }) {
  return (
    <li className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="w-6 shrink-0 text-right text-sm font-semibold text-[var(--color-primary)] tabular-nums">
        {course.order ?? ""}
      </span>
      <div className="min-w-0">
        <p className="text-[var(--color-heading)] font-medium leading-snug">
          {course.en}
        </p>
        <p className="text-[var(--color-body-muted)] text-sm leading-snug mt-1.5">
          {course.zh}
        </p>
      </div>
    </li>
  );
}

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuKey>("regular");
  const activeMenu = menu[activeTab];

  useEffect(() => {
    function syncDiet() {
      try {
        const saved = localStorage.getItem("seating-guest");
        if (saved) {
          const { name } = JSON.parse(saved);
          if (typeof name === "string") setActiveTab(name.includes("🥦") ? "vegetarian" : "regular");
        }
      } catch { /* ignore */ }
    }
    syncDiet();
    window.addEventListener("seating-guest-selected", syncDiet);
    return () => window.removeEventListener("seating-guest-selected", syncDiet);
  }, []);

  return (
    <section id="menu" className="py-12">
      <div className="mx-auto max-w-lg px-4">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-[var(--color-heading)]">
            {siteConfig.sections.menu.title}
          </h1>
          <p className="text-[var(--color-body-muted)] text-sm mt-1.5">
            {siteConfig.sections.menu.titleZh}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {(["regular", "vegetarian"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeTab === key
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "bg-gray-100 text-[var(--color-body-muted)] hover:bg-gray-200"
              }`}
            >
              {menu[key].label}
            </button>
          ))}
        </div>

        {/* Course list */}
        <ol className="list-none p-0 m-0">
          {activeMenu.courses.map((course, i) => (
            <CourseRow key={`${activeTab}-${i}`} course={course} />
          ))}
        </ol>

        {/* Late Night Snack */}
        <div className="mt-10">
          <div className="text-center mb-4">
            <h2 className="font-display text-2xl text-[var(--color-heading)]">
              {menu.lateNight.title}
            </h2>
            <p className="text-[var(--color-body-muted)] text-sm mt-1.5">
              {menu.lateNight.titleZh}
            </p>
            <p className="text-[var(--color-heading)] font-medium mt-3">
              {menu.lateNight.subtitle}
            </p>
          </div>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-3 list-none p-0 m-0 text-center">
            {menu.lateNight.courses.map((course, i) => (
              <li key={`lateNight-${i}`}>
                <p className="text-[var(--color-heading)] font-medium leading-snug">
                  {course.en}
                </p>
                <p className="text-[var(--color-body-muted)] text-sm leading-snug mt-1.5">
                  {course.zh}
                </p>
              </li>
            ))}
          </ol>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/enzi-ice-cream.png"
            alt="Enzi Ice Cream"
            className="mx-auto mt-6 mb-6 max-h-64"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
