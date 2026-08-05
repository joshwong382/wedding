import { siteConfig } from "./site";

export type DevoLang = "en" | "zh";

export interface DevoExpression {
  readonly term: string;
  readonly greek: string;
  readonly text: string;
}

export interface DevoContent {
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly iceBreaker: {
    readonly heading: string;
    readonly question: string;
    readonly note: string;
  };
  readonly expressions: {
    readonly heading: string;
    readonly items: readonly DevoExpression[];
  };
  readonly scripture: {
    readonly heading: string;
    readonly text: string;
  };
  readonly insight: {
    readonly heading: string;
    readonly text: string;
  };
  readonly discussion: {
    readonly heading: string;
    readonly questions: readonly {
      readonly text: string;
      readonly subs: readonly string[];
    }[];
  };
}

export const devo: Record<DevoLang, DevoContent> = siteConfig.sections.devo;
