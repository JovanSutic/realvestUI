import { DropdownOptions } from "../types/component.types";
import {
  CardsReport,
  CardsReportCalculation,
  DistributionTypeKey,
  GeneralObject,
  LangType,
  LineChartPreparedData,
  LineDataset,
  MainReportTableCalculation,
  MainReportTableData,
  MainReportType,
  PieChartData,
  PieReportType,
  PropertyType,
} from "../types/dashboard.types";
import { RangeOption, formatDate } from "./dateTime";
import { makeNumberCurrency, roundNumberToDecimal } from "./numbers";

const getListAverage = (list: number[], divider: number): number => {
  return list?.length
    ? (list || []).reduce((a: number, b: number) => a + b, 0) / divider
    : 0;
};

const packageTheReport = (
  calculation: Record<string, MainReportTableCalculation>
): Record<string, MainReportTableData> => {
  const result: Record<string, MainReportTableData> = {};

  Object.keys(calculation).forEach((key) => {
    const average = getListAverage(
      calculation[key].averageM2,
      calculation[key].averageM2.length
    );
    const averagePrice = getListAverage(
      calculation[key].averagePrice,
      calculation[key].count
    );
    const averageSize = getListAverage(
      calculation[key].averageSize,
      calculation[key].count
    );

    result[key] = {
      ...calculation[key],
      averageM2: roundNumberToDecimal(average, 0),
      averageSize: roundNumberToDecimal(averageSize, 0),
      averagePrice: roundNumberToDecimal(averagePrice, 0),
    };
  });

  return result;
};

const processDataForTable = (
  reports: MainReportType[]
): Record<string, MainReportTableCalculation> => {
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
        averagePrice: [element.sum_price],
        averageSize: element.sum_size > 0 ? [element.sum_size] : [],
      };
    } else {
      result[element.municipality.name].count =
        result[element.municipality.name].count + element.count;
      if (element.sum_price! > 0) {
        result[element.municipality.name].averagePrice!.push(
          element.sum_price!
        );
      }
      if (element.sum_size! > 0) {
        result[element.municipality.name].averageSize!.push(element.sum_size!);
      }
      if (element.average_meter_price > 0) {
        result[element.municipality.name].averageM2.push(
          element.average_meter_price
        );
      }
    }
  }

  return result;
};

export const getDataForMainReport = (
  reports: MainReportType[]
): Record<string, MainReportTableData> => {
  const result: Record<string, MainReportTableCalculation> =
    processDataForTable(reports);

  return packageTheReport(result);
};

export const getDataForMainCards = (reports: MainReportType[]): CardsReport => {
  const result: Record<string, MainReportTableCalculation> =
    processDataForTable(reports);
  const test: CardsReportCalculation = {
    averageM2: [],
    averagePrice: [],
    averageSize: [],
    count: [],
  };

  Object.keys(result).forEach((key) => {
    test.averageM2.push(...result[key].averageM2.filter((item) => item > 0));
    test.averagePrice.push(
      ...result[key].averagePrice.filter((item) => item > 0)
    );
    test.averageSize.push(
      ...result[key].averageSize.filter((item) => item > 0)
    );
    test.count.push(result[key].count);
  });

  const count = (test.count || []).reduce((a: number, b: number) => a + b, 0);

  return {
    averageM2: {
      labelKey: "cardAverageM2",
      changeValue: -13,
      value: makeNumberCurrency(
        roundNumberToDecimal(
          getListAverage(test.averageM2, test.averageM2.length),
          0
        )
      ),
    },
    averagePrice: {
      labelKey: "cardAveragePrice",
      changeValue: 0,
      value: makeNumberCurrency(
        roundNumberToDecimal(getListAverage(test.averagePrice, count), 0)
      ),
    },
    averageSize: {
      labelKey: "cardAverageSize",
      changeValue: 5,
      value: makeNumberCurrency(
        roundNumberToDecimal(
          getListAverage(test.averageSize, count),
          0
        ),
        " m2"
      ),
    },
  };
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
  return list.map((item) => roundNumberToDecimal((item / sum) * 100, 1));
};

export const getOptions = (list: GeneralObject[]): DropdownOptions[] => {
  return list?.map((item) => ({ value: `${item.id}`, text: item.name }));
};

const getPieSpread = (
  key: DistributionTypeKey,
  isParking: boolean
): number[] => {
  if (isParking && key !== "average_price_map")
    return [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
  if (key === "average_price_map")
    return [1000, 1500, 2000, 2500, 3000, 3500, 4000];
  return [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000];
};

export const getDataForPie = (
  list: PieReportType[],
  numericKey: DistributionTypeKey,
  propertyType: PropertyType
): PieChartData => {
  const total: number[] = [];
  list?.forEach((item) => total.push(...item[numericKey]));
  total.sort((a: number, b: number) => a - b);
  const spread = getPieSpread(numericKey, propertyType === "parking");
  let start = 0;
  const result: Record<string, number[]> = {};
  for (let index = 0; index < spread.length; index++) {
    const element = spread[index];
    const previousElement = index === 0 ? 0 : spread[index - 1];
    const mark = total.findIndex((item) => item >= element);
    const slice = mark > 0 ? total.slice(start, mark) : total.slice(start);
    if (slice.length) {
      result[
        `${makeNumberCurrency(previousElement)} - ${makeNumberCurrency(
          element
        )}`
      ] = slice;
    }
    start = mark > 0 ? mark : total.length;

    if (index === spread.length - 1) {
      if (total.slice(mark).length && mark > 0) {
        result[`${makeNumberCurrency(element)}+`] = total.slice(mark);
      }
    }
  }

  return {
    labels: Object.keys(result),
    data: Object.keys(result).map((key) => result[key].length),
  };
};

const getAverage = (list: MainReportType[]): number => {
  let sum = 0;
  let empty = 0;

  list.forEach((item) => {
    if (item.average_meter_price > 0) {
      sum = sum + item.average_meter_price;
    } else {
      empty = empty + 1;
    }
  });

  return sum / (list.length - empty) || 0;
};

const calculateLineData = (
  data: MainReportType[],
  timeRange: RangeOption,
  lang: LangType
): LineChartPreparedData => {
  const dividerMap = {
    "3y": 4,
    "5y": 6,
    "10y": 12,
  };
  if (timeRange === "3y" || timeRange === "5y" || timeRange === "10y") {
    const result: Record<string, number> = {};
    let divider = 0;
    for (let index = 0; index < data.length; index++) {
      if (index === divider) {
        const nextDivider = divider + dividerMap[timeRange];
        const slice = data.slice(divider, nextDivider);
        result[formatDate(slice[0].date_to!, lang, false) || `${index}`] =
          getAverage(slice);
        divider = nextDivider;
      }
    }

    return {
      labels: Object.keys(result),
      data: Object.values(result),
    };
  }

  return {
    labels: data.map((item) => formatDate(item.date_to!, lang, false)),
    data: data.map((item) => item.average_meter_price),
  };
};

export const getSingleLineDataset = (
  data: MainReportType[],
  label: string,
  timeRange: RangeOption,
  lang: LangType = "sr"
): LineDataset => {
  const dataSet = {
    labels: calculateLineData(data, timeRange, lang).labels,
    datasets: [
      {
        label: label,
        data: calculateLineData(data, timeRange, lang).data,
        fill: true,
        backgroundColor: "rgba(240, 185, 11, 0.5)",
        borderColor: "rgba(240, 185, 11, 1)",
      },
    ],
  };

  return dataSet;
};
