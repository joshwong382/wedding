"use client";

import { useState, useEffect, useRef, useCallback, useDeferredValue } from "react";
import { createPortal } from "react-dom";
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
  loadLang,
  saveLang,
  type Lang,
} from "@/lib/seating-search";
import { BottomSheet } from "@/components/bottom-sheet";
import { SeatingMap } from "@/components/seating-map";
import { SeatingChartSheet } from "@/components/seating-chart-sheet";
import scheduleData from "../../public/schedule.json";

function useCurrentEvent(lang: Lang) {
    const [event, setEvent] = useState<{ label: string; link?: string } | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      let current: (typeof scheduleData)[number] | null = null;
      for (const item of scheduleData) {
        const [h, m] = item.time.split(":").map(Number);
        if (mins >= h! * 60 + m!) current = item;
      }
      setEvent(current ? {
        label: lang === "zh" ? current.labelZh : current.label,
        link: (current as { link?: string }).link,
      } : null);
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [lang]);

  return event;
}

type SearchState =
  | { stage: "idle" }
  | { stage: "searching" }
  | { stage: "result"; name: string; tableId: string };

export function SeatingSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({ stage: "idle" });
  const [lang, setLang] = useState<Lang>("en");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const currentEvent = useCurrentEvent(lang);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [cardVisible, setCardVisible] = useState(true);
  const deferredQuery = useDeferredValue(query);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const saved = loadSavedGuest();
    if (saved) {
      setQuery(saved.name);
      setState({ stage: "result", name: saved.name, tableId: saved.tableId });
      window.dispatchEvent(new Event("seating-guest-selected"));
    }
    setLang(loadLang());
    function syncLang() { setLang(loadLang()); }
    window.addEventListener("seating-lang-changed", syncLang);
    return () => window.removeEventListener("seating-lang-changed", syncLang);
  }, []);

  // Track whether the result card is on screen. Once it scrolls away the
  // sticky pill takes over as the persistent answer to "what table am I?".
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCardVisible(entry!.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
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
    saveGuest(name, tableId, lang);
    window.dispatchEvent(new Event("seating-guest-selected"));
    // Auto-open on an explicit pick only. The localStorage restore path
    // deliberately does not do this — a sheet popping open on every page
    // refresh is a different experience from one following a tap.
    setMapOpen(true);
  }, [lang]);

  /** Reset the search back to empty and hand focus back to the input. */
  const clearQuery = useCallback(() => {
    setQuery("");
    setState({ stage: "idle" });
    setDropdownOpen(false);
    setActiveIndex(-1);
    setMapOpen(false);
    clearSavedGuest();
    inputRef.current?.focus();
  }, []);

  const setLanguage = useCallback((newLang: Lang) => {
    setLang(newLang);
    saveLang(newLang);
    if (state.stage === "result") {
      saveGuest(state.name, state.tableId, newLang);
    }
    window.dispatchEvent(new Event("seating-lang-changed"));
  }, [state]);

  function handleKeyDown(e: React.KeyboardEvent) {
    // Escape works whether or not the dropdown is open: first press dismisses
    // the suggestions, a second one clears the field.
    if (e.key === "Escape") {
      e.preventDefault();
      if (showDropdown) {
        setDropdownOpen(false);
        setActiveIndex(-1);
      } else {
        clearQuery();
      }
      return;
    }
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
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col" ref={rootRef}>
      <label
        htmlFor="seating-input"
        className="mb-2 block text-base font-bold tracking-[1.5px] text-white"
      >
        {siteConfig.sections.seatingSearch.inputLabel}
      </label>

      {/* Input with autocomplete dropdown */}
      <div className="relative" ref={containerRef}>
        <input
          ref={inputRef}
          id="seating-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setState({ stage: "searching" });
            setDropdownOpen(true);
            setActiveIndex(-1);
            setMapOpen(false);
            clearSavedGuest();
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
          /* Padding is symmetric so the clear button doesn't knock the
             centred text off-centre. */
          className="starry-textbox w-full bg-transparent px-10 py-2 text-center text-base text-white outline-none"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}

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
        </div>
      )}

      {/* No match state */}
      {state.stage === "searching" && deferredQuery.length > 0 && matches.length === 0 && (
        <p className="mt-4 text-sm text-white/60">No guests found for &ldquo;{deferredQuery}&rdquo;</p>
      )}

      {/* Actions sit outside the result card: the card stays purely
          informational, and the chart stays reachable before searching and
          when a name doesn't match. */}
      {state.stage === "result" && (
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="w-full rounded-full bg-white py-2.5 text-sm font-semibold text-[#2B2622] transition-colors hover:bg-white/90"
          >
            📍 View floor plan
          </button>
          <button
            type="button"
            onClick={() => setChartOpen(true)}
            className="w-full rounded-full border border-white/30 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            📋 View entire chart
          </button>
        </div>
      )}

      <BottomSheet
        open={chartOpen}
        onClose={() => setChartOpen(false)}
        title="Full seating chart"
        maxHeight="max-h-[92vh]"
      >
        <SeatingChartSheet />
      </BottomSheet>

      {/* Scroll hint — a real control, not just an animated glyph */}
      {state.stage === "result" && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("devo")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            aria-label="Scroll to the rest of the page"
            className="rounded-full p-2 text-white/40 transition-colors hover:text-white/80"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce motion-reduce:animate-none"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Floor plan sheet. Shared by the card button and the sticky pill, so it
          lives outside the card — which scrolls away. */}
      {state.stage === "result" && (
        <BottomSheet
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          title="Venue floor plan"
        >
          <p className="mb-2 text-center text-2xl font-bold text-[#2B2622]">
            {formatTableLabel(state.tableId)}
          </p>
          <SeatingMap highlightedTable={state.tableId} />
        </BottomSheet>
      )}

      {/* Sticky pill — keeps the answer reachable once the card is off screen.
          Portalled to body because .hero-element's transform would otherwise
          become the containing block for position: fixed. The "result" guard
          means this only ever renders client-side, so document is available. */}
      {state.stage === "result" &&
        createPortal(
          <div
            aria-hidden={cardVisible}
            className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 ${
              cardVisible
                ? "pointer-events-none translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex items-center rounded-full border border-white/10 bg-[#2B2622]/95 px-1 py-1.5 text-white shadow-lg backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                tabIndex={cardVisible ? -1 : 0}
                className={`whitespace-nowrap shrink-0 rounded-full pl-3 py-1.5 text-sm font-semibold transition-colors hover:bg-white/10 ${currentEvent ? "pr-0" : "pr-3"}`}
              >
                📍 {formatTableLabel(state.tableId)}
              </button>
              {currentEvent && (
                <>
                  <span className="shrink-0 flex items-center gap-1.5 mx-3">
                    <span className="h-4 w-px bg-white/20" />
                    <span className="h-4 w-px bg-white/20" />
                  </span>
                  {currentEvent.link ? (
                    <a
                      href={currentEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pr-3 text-xs truncate flex items-center gap-1.5 underline underline-offset-2"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400 animate-pulse" />
                      {currentEvent.label}
                    </a>
                  ) : (
                    <span className="pr-3 text-xs opacity-80 truncate flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400 animate-pulse" />
                      {currentEvent.label}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>,
          document.body,
        )}

      {state.stage !== "result" && (
        <button
          type="button"
          onClick={() => setChartOpen(true)}
          className="mt-auto mb-6 w-full rounded-full border border-white/30 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          📋 View entire chart
        </button>
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
