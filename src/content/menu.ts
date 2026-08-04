import menuData from "../../public/menu.json";

export interface Course {
  readonly order: number | null;
  readonly en: string;
  readonly zh: string;
}

export interface MenuSection {
  readonly label: string;
  readonly courses: readonly Course[];
}

export interface LateNightItem {
  readonly label: string;
  readonly flavour: string;
}

export interface LateNight {
  readonly title: string;
  readonly image: string;
  readonly items: readonly LateNightItem[];
}

export interface MenuData {
  readonly regular: MenuSection;
  readonly vegetarian: MenuSection;
  readonly lateNight: LateNight;
}

export const menu: MenuData = menuData as MenuData;
