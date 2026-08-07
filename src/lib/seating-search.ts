/**
 * Seating search logic — pure functions, no DOM/React dependency.
 * Testable in isolation.
 */

import type { SeatingData } from "@/content/seating";

export interface SeatingMatch {
  readonly name: string;
  readonly tableId: string;
}

export const HEAD_TABLE_ID = "0";

/**
 * Find all guests whose names contain the search string (case-insensitive).
 * Returns at most `limit` results to prevent rendering an unreasonable list.
 */
export function findGuestMatches(
  seatingData: SeatingData,
  query: string,
  limit = 50,
): readonly SeatingMatch[] {
  if (query.length < 1) return [];

  const normalised = query.toLowerCase();
  const matches: SeatingMatch[] = [];

  for (const [tableId, guests] of Object.entries(seatingData)) {
    for (const name of guests) {
      if (name.toLowerCase().includes(normalised)) {
        matches.push({ name, tableId });
        if (matches.length >= limit) return matches;
      }
    }
  }

  return matches;
}

/**
 * Get all guests seated at a given table.
 */
export function getTableGuests(
  seatingData: SeatingData,
  tableId: string,
): readonly string[] {
  return seatingData[tableId] ?? [];
}

/**
 * Format the table label for display.
 * Head table (table 0) gets a special label.
 */
export function formatTableLabel(tableId: string): string {
  if (tableId === HEAD_TABLE_ID) {
    return "Head Table";
  }
  return `Table ${tableId}`;
}

/**
 * Whether the matched guest is at the head table (used for special messaging).
 */
export function isHeadTable(tableId: string): boolean {
  return tableId === HEAD_TABLE_ID;
}

/**
 * Whether a guest name indicates vegetarian diet (marked with 🥦 emoji).
 */
export function isVegetarian(guestName: string): boolean {
  return guestName.includes("🥦");
}

const STORAGE_KEY = "seating-guest";

export interface SavedGuest {
  readonly name: string;
  readonly tableId: string;
  readonly vegetarian?: boolean;
}

/**
 * Load a previously saved guest selection from localStorage.
 * Returns null if nothing is saved or data is corrupt.
 */
export function loadSavedGuest(): SavedGuest | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const { name, tableId } = JSON.parse(saved);
    if (name && tableId) return { name, tableId };
  } catch { /* ignore corrupt data or SSR */ }
  return null;
}

/**
 * Persist the selected guest to localStorage.
 */
export function saveGuest(name: string, tableId: string): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ name, tableId, vegetarian: isVegetarian(name) }),
  );
}

/**
 * Clear the saved guest from localStorage.
 */
export function clearSavedGuest(): void {
  localStorage.removeItem(STORAGE_KEY);
}
