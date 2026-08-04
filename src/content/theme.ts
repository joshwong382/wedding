/**
 * Typography and style tokens for the hero section.
 * Based on the wedding design spec using Google Fonts.
 */

export const heroTypography = {
  moniker: {
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
  },
  names: {
    fontFamily: "var(--font-heading)",
    fontWeight: 500,
    fontStyle: "italic" as const,
  },
  date: {
    fontFamily: "var(--font-body)",
    fontWeight: 300,
    textTransform: "uppercase" as const,
    letterSpacing: "0.46em",
  },
} as const;
