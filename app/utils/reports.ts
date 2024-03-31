import { DropdownOptions } from "../types/component.types";
import { DistributionTypeKey, GeneralObject, MainReportTableCalculation, MainReportTableData, MainReportType, PieChartData, PieReportType, PropertyType } from "../types/dashboard.types";
import { makeNumberCurrency, roundNumberToDecimal } from "./numbers";

const packageTheReport = (
  calculation: Record<string, MainReportTableCalculation>
): Record<string, MainReportTableData> => {
  const result: Record<string, MainReportTableData> = {};

  Object.keys(calculation).forEach((key) => {
    const average = calculation[key].averageM2.length
      ? calculation[key].averageM2.reduce((a: number, b: number) => a + b, 0) /
        calculation[key].averageM2.length
      : 0;
    result[key] = {
      ...calculation[key],
      averageM2: roundNumberToDecimal(average, 2),
    };
  });

  return result;
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
  const result: Record<string, MainReportTableCalculation> = {};
  let test = 0;

  for (let index = 0; index < reports.length; index++) {
    const element = reports[index];
    if (element.municipality.id === 1) {
      test = test + element.average_meter_price;
    }
    if (!result[element.municipality.name]) {
      result[element.municipality.name] = {
        count: element.count,
        averageM2:
          element.average_meter_price > 0 ? [element.average_meter_price] : [],
        maxM2: element.max_average,
        minM2: element.min_average,
      };
    } else {
      result[element.municipality.name].count =
        result[element.municipality.name].count + element.count;
      result[element.municipality.name].maxM2 =
        element.max_average > result[element.municipality.name].maxM2
          ? roundNumberToDecimal(element.max_average, 2)
          : roundNumberToDecimal(result[element.municipality.name].maxM2, 2);
      result[element.municipality.name].minM2 = setNewMin(
        result[element.municipality.name].minM2,
        element.min_average
      );
      if (element.average_meter_price > 0) {
        result[element.municipality.name].averageM2.push(
          element.average_meter_price
        );
      }
    }
  }

  return packageTheReport(result);
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

export const numbersToPercentage = (list: number[]): number[] => {
  const sum = list.reduce((total, item) => total + item);
  return list.map((item) => (roundNumberToDecimal((item / sum) * 100, 2)));
}

export const getOptions = (list: GeneralObject[]): DropdownOptions[] => {
  return list?.map((item) => ({ value: `${item.id}`, text: item.name }));
};

const getPieSpread = (key: DistributionTypeKey, isParking: boolean): number[] => {
  if(isParking && key !== "average_price_map") return [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
  if (key === "average_price_map")
    return [1000, 1500, 2000, 2500, 3000, 3500, 4000];
  return [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000];
};

export const getDataForPie = (
  list: PieReportType[],
  numericKey: DistributionTypeKey,
  propertyType: PropertyType,
  prefix: {upto: string; from: string;}
): PieChartData => {
  const total: number[] = [];
  list?.forEach((item) => total.push(...item[numericKey]));
  total.sort((a: number, b: number) => a - b);
  const spread = getPieSpread(numericKey, propertyType === "parking");
  let start = 0;
  const result: Record<string, number[]> = {};
  for (let index = 0; index < spread.length; index++) {
    const element = spread[index];
    const mark = total.findIndex((item) => item >= element);
    const slice = mark > 0 ? total.slice(start, mark) : total.slice(start);
    if (slice.length) {
      result[`${prefix.upto} ${makeNumberCurrency(element)}`] = slice;
    }
    start = mark > 0 ? mark : total.length;

    if (index === spread.length - 1) {
      if (total.slice(mark).length && mark > 0) {
        result[`${prefix.from} ${makeNumberCurrency(element)}`] = total.slice(mark);
      }
    }
  }

  return {
    labels: Object.keys(result),
    data: Object.keys(result).map((key) => result[key].length),
  };
};
