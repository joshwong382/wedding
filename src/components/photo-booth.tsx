import { siteConfig } from "@/content/site";
import { HeartIcon } from "./heart-icon";

export function PhotoBooth() {
  const { sections, theme } = siteConfig;
  const { photoBooth: config } = sections;

  return (
    <section
      id="photos"
      className="py-16"
      style={{ background: `linear-gradient(135deg, ${theme.sectionBgFrom} 0%, ${theme.sectionBgTo} 100%)` }}
    >
      <div className="mx-auto max-w-[85%] text-center">
        <div className="section-title relative">
          <h1 className="section-heading font-display mb-4 text-[var(--color-primary)]">
            {config.title}
          </h1>
          <div className="section-heart">
            <HeartIcon color="var(--color-heart-dark)" />
          </div>
        </div>
        <p className="text-xl font-light text-[var(--color-body-muted)]">
          {config.description}
        </p>
        <div className="mt-4">
          <a
            href={config.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-bold tracking-wide text-white uppercase transition-colors"
          >
            {config.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
