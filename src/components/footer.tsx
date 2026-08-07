import { siteConfig } from "@/content/site";

export function Footer() {
  const { credits, meta, theme } = siteConfig;

  return (
    <footer
      className="border-t border-black/10 pt-14 pb-12"
      style={{
        background: `linear-gradient(135deg, ${theme.sectionBgFrom} 0%, ${theme.sectionBgTo} 100%)`,
      }}
    >
      <div className="mx-auto max-w-lg px-4 text-center">
        <h2 className="font-display text-4xl text-[var(--color-heading)]">
          {siteConfig.sections.footer.title}
        </h2>

        <p className="mt-6 text-[var(--color-body-muted)] leading-relaxed">
          We are so grateful to celebrate this day with you.
        </p>

        <div className="mt-8 border-t border-black/10 pt-6 text-xs text-[var(--color-body-muted)]">
          <p>
            <a
              href={meta.url}
              className="text-[var(--color-primary)] hover:underline"
            >
              {meta.url}
            </a>
          </p>
          <p className="mt-2">
            Website by {credits.builtBy} · {credits.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
