/* eslint-disable @next/next/no-img-element */

export function SeatingChartImage() {
  return (
    <section className="pb-16">
      <div className="mx-auto max-w-[95%] text-center sm:max-w-[85%]">
        <img
          src="/images/seating-chart.png"
          alt="Full seating chart listing every table and guest"
          className="mx-auto h-auto w-full max-w-3xl object-contain"
          width={1836}
          height={2376}
          loading="lazy"
        />
      </div>
    </section>
  );
}
