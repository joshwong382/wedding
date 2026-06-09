/**
 * Menu data — structured as courses with dishes.
 * Each course has a title and an array of items.
 * Each item has a bold name and separate description lines (matching v1 layout).
 */

export interface MenuItem {
  readonly name: string;
  readonly lines: readonly string[];
}

export interface MenuCourse {
  readonly title: string;
  readonly items: readonly MenuItem[];
}

export const menuCourses: readonly MenuCourse[] = [
  {
    title: "First Course",
    items: [
      {
        name: "Mixed Greens Cucumber Bouquet",
        lines: [
          "Candied Pecans, Goat's Cheese",
          "Heirloom Tomatoes, Balsamic Vinaigrette",
        ],
      },
    ],
  },
  {
    title: "Second Course",
    items: [
      {
        name: "8 oz. Boneless Red Wine Braised Beef Short Ribs",
        lines: [
          "Roasted Garlic Potato Pave",
          "Fresh Snipped Carrot & Asparagus",
        ],
      },
    ],
  },
  {
    title: "Third Course",
    items: [
      {
        name: "Warm Apple Blossom",
        lines: ["Butterscotch Drizzle", "French Vanilla Ice Cream"],
      },
    ],
  },
  {
    title: "Late Night Station",
    items: [
      {
        name: "EXTREME POUTINE STATION",
        lines: [
          "Yukon Gold & Sweet Potato Fries, Pulled Pork, Bacon Bits, Scallions, Sour Cream, Shredded Cheddar Cheese, Fresh Cheese Curds, Sautéed Mushrooms, Diced Tomatoes, Jalapeno Peppers, Home-Style Beef Gravy & Cheese Sauce served in Authentic Take-Away Containers",
        ],
      },
    ],
  },
] as const;
