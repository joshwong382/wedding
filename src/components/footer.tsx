import { siteConfig } from "@/content/site";

export function Footer() {
  const { credits, meta } = siteConfig;

  return (
    <footer className="bg-[var(--color-accent)] text-white">
      <div className="bg-black/10 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="section-title relative">
            <h1 className="section-heading font-display text-white">
              {siteConfig.sections.footer.title}
            </h1>
          </div>

          <p className="mt-6">
            <a
              href={meta.url}
              className="text-[var(--color-primary)] hover:underline"
            >
              {meta.url}
            </a>
          </p>

          <div className="mt-3 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-8">
            <p className="text-sm">Website by {credits.builtBy}</p>
            <p className="text-sm text-white/80">{credits.email}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
