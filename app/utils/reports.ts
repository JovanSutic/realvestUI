import { roundNumberToDecimal } from "./numbers";

export type MainReportType = {
  id: number;
  count: number;
  average_meter_price: number;
  min_average: number;
  max_average: number;
  municipality: {
    id: number;
    name: string;
  };
};

export type MainReportTableData = {
  municipality?: string;
  count: number;
  averageM2: number;
  maxM2: number;
  minM2: number;
};

const setNewAverage = (numA: number, numB: number): number => {
  if (numA === 0 && numB === 0) return 0;
  if (numA === 0) return numB;
  if (numB === 0) return numA;

  return roundNumberToDecimal((numA + numB) / 2, 2);
};

const setNewMin = (numA: number, numB: number): number => {
  if (numA === 0 && numB === 0) return 0;
  if (numA === 0) return numB;
  if (numB === 0) return numA;

  return numB < numA
    ? roundNumberToDecimal(numB, 2)
    : roundNumberToDecimal(numA, 2);
};

export const getDataForMainReport = (
  reports: MainReportType[]
): Record<string, MainReportTableData> => {
  const result: Record<string, MainReportTableData> = {};

  for (let index = 0; index < reports.length; index++) {
    const element = reports[index];
    if (!result[element.municipality.name]) {
      result[element.municipality.name] = {
        count: element.count,
        averageM2: element.average_meter_price,
        maxM2: element.max_average,
        minM2: element.min_average,
      };
    } else {
      result[element.municipality.name].count =
        result[element.municipality.name].count + element.count;
      result[element.municipality.name].averageM2 = setNewAverage(
        result[element.municipality.name].averageM2,
        element.average_meter_price
      );
      result[element.municipality.name].maxM2 =
        element.max_average > result[element.municipality.name].maxM2
          ? roundNumberToDecimal(element.max_average, 2)
          : roundNumberToDecimal(result[element.municipality.name].maxM2, 2);
      result[element.municipality.name].minM2 = setNewMin(
        result[element.municipality.name].minM2,
        element.min_average
      );
    }
  }

  return result;
};

export const listMainReportData = (
  data: Record<string, MainReportTableData>
): MainReportTableData[] => {
  const result: MainReportTableData[] = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      result.push({ ...data[key], municipality: key });
    });
  }

  return result;
};
