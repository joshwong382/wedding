import seatingChart from "../../public/seating_chart.json";

export type SeatingData = Record<string, readonly string[]>;

export const seatingData: SeatingData = seatingChart;
