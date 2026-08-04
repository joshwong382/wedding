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

type SearchState =
  | { stage: "idle" }
  | { stage: "searching" }
  | { stage: "result"; name: string; tableId: string };

export function SeatingSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({ stage: "idle" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const matches = state.stage !== "result"
    ? findGuestMatches(seatingData, deferredQuery)
    : [];

  const showDropdown = dropdownOpen && deferredQuery.length > 0 && state.stage !== "result" && matches.length > 0;

  function selectGuest(name: string, tableId: string) {
    setQuery(name);
    setDropdownOpen(false);
    setState({ stage: "result", name, tableId });
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <label
        htmlFor="seating-input"
        className="mb-2 block text-base font-bold tracking-[1.5px] text-white"
      >
        {siteConfig.sections.seatingSearch.inputLabel}
      </label>

      {/* Input with autocomplete dropdown */}
      <div className="relative">
        <input
          id="seating-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setState({ stage: "searching" });
            setDropdownOpen(true);
          }}
          onFocus={() => setDropdownOpen(true)}
          autoComplete="off"
          spellCheck={false}
          className="starry-textbox w-full bg-transparent px-4 py-2 text-center text-base text-white outline-none"
        />

        {showDropdown && (
          <ul className="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-white/20 bg-black/90 backdrop-blur-sm">
            {matches.map((m) => (
              <li key={`${m.tableId}-${m.name}`}>
                <button
                  type="button"
                  onClick={() => selectGuest(m.name, m.tableId)}
                  className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                >
                  {m.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Result card */}
      {state.stage === "result" && (
        <div className="mt-2 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 text-white">
          <TableResult name={state.name} tableId={state.tableId} />
        </div>
      )}

      {/* No match state */}
      {state.stage === "searching" && deferredQuery.length > 0 && matches.length === 0 && (
        <p className="mt-4 text-sm text-white/60">No guests found for &ldquo;{deferredQuery}&rdquo;</p>
      )}
    </div>
  );
}

function TableResult({ name, tableId }: { name: string; tableId: string }) {
  const guests = getTableGuests(seatingData, tableId);

  if (isHeadTable(tableId)) {
    return (
      <div className="text-center">
        <p className="text-lg">
          You know where you&apos;re sitting&hellip; 💕
        </p>
        <p className="mt-1 text-xs text-white/70">
          Hint: Your table doesn&apos;t have a number!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-3xl font-bold">{formatTableLabel(tableId)}</p>
      <div className="mt-3">
        <p className="text-xs text-white/50 mb-1">your tablemates</p>
        <div className="columns-2 gap-x-4 text-sm text-white/80">
          {guests.map((guest) => (
            <p
              key={guest}
              className={`break-inside-avoid py-0.5 ${
                guest === name
                  ? "font-semibold text-white underline underline-offset-4"
                  : ""
              }`}
            >
              {guest}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
