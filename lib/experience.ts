import type { MONTH_YEAR, WORK_COMPANIES_PROPS } from "@/types/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatMonthYear = ({ year, month }: MONTH_YEAR) =>
  month ? `${MONTHS[month - 1]} ${year}` : String(year);

/** "Mar 2026 – Present", "Sep 2023 – Feb 2026" or just "2021 – 2022". */
export const dateRange = ({
  start,
  end,
}: Pick<WORK_COMPANIES_PROPS, "start" | "end">) =>
  `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "Present"}`;

/**
 * Tenure in LinkedIn's style ("9 mos", "2 yrs 6 mos"; both end months count).
 * Returns null when the dates only have a year. An open-ended role is measured
 * up to today, so it refreshes with every build.
 */
export function durationLabel(
  start: MONTH_YEAR,
  end: MONTH_YEAR | null,
  now: Date = new Date(),
): string | null {
  if (!start.month || (end && !end.month)) return null;
  const last = end ?? { year: now.getFullYear(), month: now.getMonth() + 1 };
  const months =
    (last.year - start.year) * 12 + (last.month! - start.month) + 1;
  if (months < 1) return null;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [
    years ? `${years} ${years === 1 ? "yr" : "yrs"}` : "",
    rest ? `${rest} ${rest === 1 ? "mo" : "mos"}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
