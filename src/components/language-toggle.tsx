"use client";

import { useState, useEffect } from "react";
import { devo } from "@/content/devo";
import { siteConfig } from "@/content/site";
import { loadLang, saveLang, type Lang } from "@/lib/seating-search";

export function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("en");
  const { theme } = siteConfig;

  useEffect(() => {
    setLang(loadLang());
  }, []);

  function toggle(newLang: Lang) {
    setLang(newLang);
    saveLang(newLang);
    window.dispatchEvent(new Event("seating-lang-changed"));
  }

  return (
    <div
      className="flex justify-center gap-2 py-4"
      style={{
        background: `linear-gradient(135deg, ${theme.sectionBgFrom} 0%, ${theme.sectionBgTo} 100%)`,
      }}
    >      {(["en", "zh"] as const).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => toggle(key)}
          aria-pressed={lang === key}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            lang === key
              ? "bg-[var(--color-primary)] text-white shadow-sm"
              : "bg-white/70 text-[var(--color-body-muted)] hover:bg-white"
          }`}
        >
          {devo[key].label}
        </button>
      ))}
    </div>
  );
}
