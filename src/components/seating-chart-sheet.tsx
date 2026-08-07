"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * Contents of the "full seating chart" sheet — the chart poster fitted to the
 * sheet width. The sheet's own container handles vertical scrolling.
 */
export function SeatingChartSheet() {
  return (
    <img
      src="/images/seating-chart.png"
      alt="Full seating chart listing every table and guest"
      width={1836}
      height={2376}
      className="mx-auto h-auto w-full rounded-lg bg-white"
    />
  );
}
