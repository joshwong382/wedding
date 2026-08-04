"use client";

import { useState } from "react";
import { menu, type Course } from "@/content/menu";
import { siteConfig } from "@/content/site";
import { HeartIcon } from "./heart-icon";

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
        <p className="text-[var(--color-body-muted)] text-sm leading-snug mt-0.5">
          {course.zh}
        </p>
      </div>
    </li>
  );
}

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<MenuKey>("regular");
  const activeMenu = menu[activeTab];

  return (
    <section id="menu" className="py-12">
      <div className="mx-auto max-w-lg px-4">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-[var(--color-heading)] mb-2">
            {siteConfig.sections.menu.title}
          </h1>
          <div className="flex justify-center">
            <HeartIcon color="var(--color-heart-dark)" />
          </div>
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
        <div className="mt-10 text-center">
          <h2 className="font-display text-2xl text-[var(--color-heading)] mb-4">
            {menu.lateNight.title}
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={menu.lateNight.image}
            alt="Enzi Ice Cream"
            className="mx-auto mb-4 max-h-64 rounded-xl object-cover shadow-md"
            loading="lazy"
          />
          <div className="space-y-1">
            {menu.lateNight.items.map((item) => (
              <p key={item.label} className="text-[var(--color-heading)]">
                <span className="font-semibold">{item.label}:</span>{" "}
                <span className="text-[var(--color-body-muted)]">{item.flavour}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
