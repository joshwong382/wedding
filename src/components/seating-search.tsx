"use client";

import { useState, useDeferredValue } from "react";
import { seatingData } from "@/content/seating";
import { siteConfig } from "@/content/site";
import {
  findGuestMatches,
  getTableGuests,
  formatTableLabel,
  isHeadTable,
} from "@/lib/seating-search";

export function SeatingSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const matches = findGuestMatches(seatingData, deferredQuery);
  const exactMatch = matches.length === 1 ? matches[0] : null;

  return (
    <div className="mx-auto w-full max-w-sm">
      <label
        htmlFor="seating-input"
        className="mb-2 block text-base font-bold tracking-[1.5px] text-white"
      >
        {siteConfig.sections.seatingSearch.inputLabel}
      </label>
      <input
        id="seating-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        spellCheck={false}
        className="starry-textbox w-full bg-transparent px-4 py-2 text-center text-base text-white outline-none"
      />

      {deferredQuery.length > 0 && (
        <div
          className="mt-4 max-h-[55vh] overflow-y-auto text-sm tracking-wide text-white"
          role="status"
          aria-live="polite"
        >
          {matches.length === 0 && (
            <p>Name: {deferredQuery}</p>
          )}

          {matches.length > 1 && (
            <>
              <p>Name: {deferredQuery}</p>
              <div className="mt-2 space-y-0.5">
                {matches.map((m) => (
                  <button
                    key={`${m.tableId}-${m.name}`}
                    type="button"
                    onClick={() => setQuery(m.name)}
                    className="block w-full cursor-pointer text-left hover:underline"
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {exactMatch && <TableResult match={exactMatch} />}
        </div>
      )}
    </div>
  );
}

function TableResult({ match }: { match: { name: string; tableId: string } }) {
  const guests = getTableGuests(seatingData, match.tableId);

  if (isHeadTable(match.tableId)) {
    return (
      <div>
        <p>Name: {match.name}</p>
        <p className="mt-2">
          You know where you&apos;re sitting&hellip;
        </p>
        <p className="text-xs text-white/70">
          Hint: Your table doesn&apos;t have a number!
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>Name: {match.name}</p>
      <p className="mt-3">{formatTableLabel(match.tableId)}</p>
      <hr className="my-2 border-white/30" />
      <div className="space-y-0.5">
        {guests.map((guest) => (
          <p
            key={guest}
            className={guest === match.name ? "font-bold underline" : ""}
          >
            {guest}
          </p>
        ))}
      </div>
    </div>
  );
}
