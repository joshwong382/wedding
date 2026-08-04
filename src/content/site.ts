/**
 * Central site configuration.
 * Edit this file to customise for any wedding — no code changes required elsewhere.
 */

export const siteConfig = {
  couple: {
    person1: "Daniel",
    person2: "Eugenia",
  },

  /** Hero section background images */
  hero: {
    desktopImage: "/images/aobkgd.jpg",
    mobileImage: "/images/mobilebg.jpg",
    /** CSS object-position for the background image */
    imagePosition: "45% 80%",
  },

  /** Section content — edit these to change headings and descriptions */
  sections: {
    photoBooth: {
      title: "Photo Booth",
      description: "Capture your special moments with us!",
      buttonText: "VIEW PHOTOBOOTH PICTURES",
      link: "https://drive.google.com/drive/folders/1TMm3cdVq_noncW5lWEeLt6zoTaMqcHI9?usp=sharing",
    },
    menu: {
      title: "Menu",
    },
    footer: {
      title: "Thank You",
    },
    seatingSearch: {
      heading: "Find your table",
      inputLabel: "enter your name",
    },
  },

  meta: {
    title: "Daniel & Eugenia — We're Getting Married!",
    description:
      "Find your table and view the menu for the wedding of Daniel and Eugenia.",
    url: "https://wedding.josh-wong.net",
  },

  credits: {
    builtBy: "Joshua Wong",
    email: "joshua@josh-wong.net",
  },

  /** Theme colors — change these to reskin the entire site. */
  theme: {
    /** Main accent color (section titles, buttons, links) */
    primary: "#CA7A7F",
    /** Footer & dark background accent */
    accent: "#A32140",
    /** Heading text color */
    heading: "#121F38",
    /** Secondary/muted body text */
    bodyMuted: "#818491",
    /** Heart icon + decorative elements */
    heartDark: "#343a40",
    /** Hero background overlay opacity (0–1) */
    heroOverlay: 0.5,
    /** Photo booth section gradient */
    sectionBgFrom: "#f8f9fa",
    sectionBgTo: "#e9ecef",
  },
} as const;

export type SiteConfig = typeof siteConfig;
