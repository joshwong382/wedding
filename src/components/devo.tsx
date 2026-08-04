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
  const { devo } = siteConfig.sections;

  return (
    <section id="devo" className="py-12">
      <div className="mx-auto max-w-lg px-4">
        {/* Section heading */}
        <div className="text-center">
          <h1 className="font-display text-4xl text-[var(--color-heading)]">
            {devo.title}
          </h1>
          <p className="text-[var(--color-body-muted)] text-sm mt-1">
            {devo.date}
          </p>
          <h2 className="font-display text-2xl text-[var(--color-heading)] mt-6">
            {devo.subtitle}
          </h2>
        </div>

        <Block heading={devo.iceBreaker.heading}>
          <p className="text-[var(--color-heading)] leading-relaxed">
            {devo.iceBreaker.question}
          </p>
          <p className="text-[var(--color-body-muted)] text-sm leading-relaxed">
            {devo.iceBreaker.note}
          </p>
        </Block>

        <Block heading={devo.expressions.heading}>
          <ul className="list-none p-0 m-0">
            {devo.expressions.items.map((item) => (
              <li
                key={item.term}
                className="py-2 border-b border-gray-100 last:border-0"
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

        <Block heading={devo.scripture.heading}>
          <blockquote className="text-[var(--color-verse)] leading-relaxed italic">
            {devo.scripture.text}
          </blockquote>
        </Block>

        <Block heading={devo.insight.heading}>
          <p className="text-[var(--color-heading)] leading-relaxed">
            {devo.insight.text}
          </p>
        </Block>

        <Block heading={devo.discussion.heading}>
          <ul className="list-disc pl-5 space-y-2 marker:text-[var(--color-primary)]">
            {devo.discussion.questions.map((q) => (
              <li key={q} className="text-[var(--color-heading)] leading-relaxed">
                {q}
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </section>
  );
}
