/* eslint-disable @next/next/no-img-element */

export function SeatingChartImage() {
  return (
    <section>
      <div className="mx-auto max-w-[95%] text-center sm:max-w-[85%]">
        <img
          src="/images/seating-chart.png"
          alt="Full seating chart listing every table and guest"
          className="mx-auto h-auto w-full max-w-xl max-h-[70svh] object-contain"
          width={1836}
          height={2376}
          loading="lazy"
        />
      </div>
    </section>
  );
}
