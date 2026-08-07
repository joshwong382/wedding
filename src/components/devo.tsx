"use client";

import { useState, useEffect } from "react";
import { devo, type DevoLang } from "@/content/devo";
import { loadLang } from "@/lib/seating-search";

function Divider({ symbol = "✿" }: { symbol?: string }) {
  return (
    <div className="flex items-center gap-4 py-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d6a928] to-transparent" />
      <span className="text-[#d6a928] text-2xl">{symbol}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d6a928] to-transparent" />
    </div>
  );
}

export function Devo() {
  const [lang, setLang] = useState<DevoLang>("en");
  const content = devo[lang];

  useEffect(() => {
    function sync() { setLang(loadLang()); }
    sync();
    window.addEventListener("seating-lang-changed", sync);
    return () => window.removeEventListener("seating-lang-changed", sync);
  }, []);

  return (
    <section id="devo" className="w-full" style={{ background: "#fffaf0" }}>
      {/* Header */}
      <header className="w-full px-5 pt-14 pb-5 text-center">
        <h2 className="font-display text-4xl tracking-wide" style={{ color: "#4A2040" }}>
          {content.title}
        </h2>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-12">
        {/* Ice Breaker */}
        <section className="text-center">
          <h2 className="font-heading text-2xl font-bold" style={{ color: "#4A2040" }}>
            {content.iceBreaker.heading}
          </h2>
          <p className="mt-4 italic leading-relaxed text-lg" style={{ color: "#5C3A52" }}>
            {content.iceBreaker.question}
          </p>
        </section>

        <Divider />

        {/* 5 Love Languages */}
        <section className="text-center">
          <h2 className="font-heading text-2xl font-bold" style={{ color: "#4A2040" }}>
            {content.loveLanguages.heading}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 max-w-2xl mx-auto">
            {content.loveLanguages.items.map((item) => (
              <div
                key={item}
                className="rounded-xl p-4 sm:p-5 text-center shadow-sm w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)]"
                style={{ background: "#FBF5DC" }}
              >
                <p className="font-medium text-sm sm:text-base" style={{ color: "#4A2040" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 4 Biblical Expressions */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-center" style={{ color: "#4A2040" }}>
            {content.expressions.heading}
          </h2>
          <div className="mt-8 space-y-6">
            {content.expressions.items.map((item) => (
              <div key={item.term} className="border-l-4 border-[#d6a928] pl-5">
                <h3 className="font-heading text-xl font-bold" style={{ color: "#4A2040" }}>
                  {item.term} ({item.greek})
                </h3>
                <p className="mt-1 leading-relaxed text-base" style={{ color: "#5C3A52" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider symbol="❦" />

        {/* Scripture */}
        <section className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: "#FBF5DC" }}>
          <h2 className="font-heading text-2xl font-bold" style={{ color: "#765D24" }}>
            {content.scripture.heading}
          </h2>
          <blockquote className="mt-5 italic leading-loose text-base sm:text-[17px]" style={{ color: "#8C756A" }}>
            {content.scripture.text}
          </blockquote>
        </section>

        <Divider />

        {/* Some Insight */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-center" style={{ color: "#4A2040" }}>
            {content.insight.heading}
          </h2>
          <ul className="mt-5 space-y-4 list-disc list-inside text-left">
            {content.insight.items.map((item) => (
              <li key={item.slice(0, 30)} className="leading-loose text-base sm:text-[17px]" style={{ color: "#5C3A52" }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <Divider symbol="❦" />

        {/* Discussion */}
        <section className="pb-12">
          <h2 className="font-heading text-2xl font-bold text-center" style={{ color: "#4A2040" }}>
            {content.discussion.heading}
          </h2>
          <ol className="mt-6 space-y-5 list-decimal list-inside">
            {content.discussion.questions.map((q) => (
              <li key={q.slice(0, 30)} className="leading-relaxed text-base sm:text-[17px]" style={{ color: "#5C3A52" }}>
                {q}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </section>
  );
}
