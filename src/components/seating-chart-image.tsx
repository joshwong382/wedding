/* eslint-disable @next/next/no-img-element */

export function SeatingChartImage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[85%] text-center">
        <img
          src="/images/seating-chart-full.png"
          alt="Full seating chart"
          className="mx-auto max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </section>
  );
}
