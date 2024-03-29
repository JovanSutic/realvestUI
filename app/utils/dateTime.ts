export const rangeOptions = ["3m", "6m", "1y", "3y", "5y", "10y"] as const;
export type RangeOption = (typeof rangeOptions)[number];

export const getDbDateString = (date: Date): string => {
  if (Object.prototype.toString.call(date) !== "[object Date]") return "";
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};
export const rangeMap: Record<RangeOption, number> = {
  "3m": 4,
  "6m": 7,
  "1y": 13,
  "3y": 37,
  "5y": 61,
  "10y": 121,
};

export const getDateForReport = (
  range: RangeOption | null
): Date | undefined => {
  if (range) {
    const date = new Date();
    const isLastMonthLoaded = date.getDate() > 11;

    date.setMonth(
      date.getMonth() -
        (isLastMonthLoaded ? rangeMap[range] : rangeMap[range] + 1)
    );
    date.setDate(1);

    return date;
  }

  return undefined;
};

export const setDateString = (date:string, language: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(language === 'en' ? 'en-US' : 'sr-RS');
};