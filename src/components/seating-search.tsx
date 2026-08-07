"use client";

import { useState, useEffect, useRef, useCallback, useDeferredValue } from "react";
import { seatingData } from "@/content/seating";
import { siteConfig } from "@/content/site";
import {
  findGuestMatches,
  getTableGuests,
  formatTableLabel,
  isHeadTable,
  loadSavedGuest,
  saveGuest,
  clearSavedGuest,
} from "@/lib/seating-search";
import { BottomSheet } from "@/components/bottom-sheet";
import { SeatingMap } from "@/components/seating-map";

type SearchState =
  | { stage: "idle" }
  | { stage: "searching" }
  | { stage: "result"; name: string; tableId: string };

export function SeatingSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({ stage: "idle" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [chartHidden, setChartHidden] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const deferredQuery = useDeferredValue(query);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const saved = loadSavedGuest();
    if (saved) {
      setQuery(saved.name);
      setState({ stage: "result", name: saved.name, tableId: saved.tableId });
      setChartHidden(true);
      window.dispatchEvent(new Event("seating-guest-selected"));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matches = state.stage !== "result"
    ? findGuestMatches(seatingData, deferredQuery)
    : [];

  const showDropdown = dropdownOpen && deferredQuery.length > 0 && state.stage !== "result" && matches.length > 0;

  const selectGuest = useCallback((name: string, tableId: string) => {
    setQuery(name);
    setDropdownOpen(false);
    setActiveIndex(-1);
    setState({ stage: "result", name, tableId });
    setChartHidden(true);
    saveGuest(name, tableId);
    window.dispatchEvent(new Event("seating-guest-selected"));
    setTimeout(() => setMapOpen(true), 50);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < matches.length) {
          const match = matches[activeIndex]!;
          selectGuest(match.name, match.tableId);
        }
        break;
      case "Escape":
        e.preventDefault();
        setDropdownOpen(false);
        setActiveIndex(-1);
        break;
    }
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
      <div className="relative" ref={containerRef}>
        <input
          id="seating-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setState({ stage: "searching" });
            setDropdownOpen(true);
            setActiveIndex(-1);
            setChartHidden(false);
            clearSavedGuest();
            window.dispatchEvent(new Event("seating-guest-cleared"));
          }}
          onFocus={() => setDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="seating-listbox"
          aria-activedescendant={activeIndex >= 0 ? `seating-option-${activeIndex}` : undefined}
          autoComplete="off"
          spellCheck={false}
          className="starry-textbox w-full bg-transparent px-4 py-2 text-center text-base text-white outline-none"
        />

        {showDropdown && (
          <ul
            id="seating-listbox"
            role="listbox"
            className="absolute left-0 right-0 z-20 mt-1 max-h-48 short:max-h-32 overflow-y-auto rounded-lg border border-white/20 bg-black/90 backdrop-blur-sm"
          >
            {matches.map((m, i) => (
              <li
                key={`${m.tableId}-${m.name}`}
                id={`seating-option-${i}`}
                role="option"
                aria-selected={i === activeIndex}
              >
                <button
                  type="button"
                  onClick={() => selectGuest(m.name, m.tableId)}
                  className={`block w-full px-4 py-2 text-left text-sm text-white transition-colors ${
                    i === activeIndex ? "bg-white/20" : "hover:bg-white/10"
                  }`}
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
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="mt-3 w-full rounded-lg bg-white/10 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/20"
          >
            📍 View floor plan
          </button>

          <button
            type="button"
            onClick={() => {
              setChartHidden((h) => !h);
              window.dispatchEvent(new Event("seating-chart-toggle"));
            }}
            className="mt-2 w-full rounded-lg bg-white/10 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/20"
          >
            {chartHidden ? "📋 View full seating chart" : "📋 Hide full seating chart"}
          </button>

          <BottomSheet open={mapOpen} onClose={() => setMapOpen(false)}>
            <p className="mb-2 text-center text-2xl font-bold text-[#2B2622]">
              {formatTableLabel(state.tableId)}
            </p>
            <SeatingMap highlightedTable={state.tableId} />
            <button
              type="button"
              onClick={() => setMapOpen(false)}
              className="mt-3 w-full rounded-lg bg-[#2B2622] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3d3530]"
            >
              👥 See tablemates
            </button>
          </BottomSheet>
        </div>
      )}

      {/* Scroll hint arrow */}
      {state.stage === "result" && (
        <div className="mt-4 flex justify-center animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
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
