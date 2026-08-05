"use client";

import { useState } from "react";
import { devo, type DevoLang } from "@/content/devo";
import { siteConfig } from "@/content/site";

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-[var(--color-heading)]">{heading}</h2>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

export function Devo() {
  const [lang, setLang] = useState<DevoLang>("en");
  const content = devo[lang];
  const { theme } = siteConfig;

  return (
    <section
      id="devo"
      className="border-y border-black/10 pt-14 pb-12"
      style={{
        background: `linear-gradient(135deg, ${theme.sectionBgFrom} 0%, ${theme.sectionBgTo} 100%)`,
      }}
    >
      <div className="mx-auto max-w-lg px-4">
        {/* Section heading — bilingual, independent of the language toggle */}
        <div className="text-center">
          <h1 className="font-display text-4xl text-[var(--color-heading)]">
            {devo.en.title}
          </h1>
          <p className="text-[var(--color-body-muted)] text-sm mt-1.5">
            {devo.zh.title}
          </p>
        </div>

        {/* Language tabs */}
        <div className="flex justify-center gap-2 mt-6">
          {(["en", "zh"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setLang(key)}
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

        <h2 className="text-2xl font-semibold text-[var(--color-heading)] mt-6">
          {content.subtitle}
        </h2>

        <Block heading={content.iceBreaker.heading}>
          <p className="text-[var(--color-heading)] leading-relaxed">
            {content.iceBreaker.question}
          </p>
          <p className="text-[var(--color-body-muted)] text-sm leading-relaxed">
            {content.iceBreaker.note}
          </p>
        </Block>

        <Block heading={content.expressions.heading}>
          <ul className="list-none p-0 m-0">
            {content.expressions.items.map((item) => (
              <li
                key={item.term}
                className="py-2 border-b border-black/10 last:border-0"
              >
                <p className="text-[var(--color-heading)] leading-relaxed">
                  <span className="font-semibold">{item.term}</span>{" "}
                  <span className="text-[var(--color-body-muted)]">
                    ({item.greek})
                  </span>
                  : {item.text}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block heading={content.scripture.heading}>
          <blockquote className="text-[var(--color-verse)] leading-relaxed italic">
            {content.scripture.text}
          </blockquote>
        </Block>

        <Block heading={content.insight.heading}>
          <p className="text-[var(--color-heading)] leading-relaxed">
            {content.insight.text}
          </p>
        </Block>

        <Block heading={content.discussion.heading}>
          <ul className="list-disc pl-5 space-y-2 marker:text-[var(--color-primary)]">
            {content.discussion.questions.map((q) => (
              <li
                key={q.text}
                className="text-[var(--color-heading)] leading-relaxed"
              >
                {q.text}
                {q.subs.length > 0 && (
                  <ul className="list-[circle] pl-5 mt-2 space-y-2 marker:text-[var(--color-primary)]">
                    {q.subs.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </section>
  );
}
