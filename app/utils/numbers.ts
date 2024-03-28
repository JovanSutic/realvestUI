export const isNumber = (value: string | number): boolean => {
  if (typeof value === "number") return true;
  if (typeof value === "string" && !value.length) return false;
  if (typeof value !== "string" && typeof value !== "number") return false;

  return !Number.isNaN(Number(value.replace(",", ".")));
};

export const roundNumberToDecimal = (
  num: number,
  decimalPlace: number
): number => {
  if (!isNumber(num) || !isNumber(decimalPlace)) return 0;
  return Number((Math.round(num * 100) / 100).toFixed(decimalPlace));
};
