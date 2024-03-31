export type GeneralObject = { id: number; name: string };
export const propertyType = ['residential', 'parking', 'commercial'] as const;
export type PropertyType = (typeof propertyType)[number];

export type PieReportType = {
  id: number;
  price_map: number[];
  average_price_map: number[];
  municipality: {
    id: number;
    name: string;
  };
};

export type PieChartData = { labels: string[]; data: number[] };

export type LangType = 'en' | 'sr';

export type DistributionTypeKey = "price_map" | "average_price_map";

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

export type MainReportTableCalculation = {
  municipality?: string;
  count: number;
  averageM2: number[];
  maxM2: number;
  minM2: number;
};

export type DashboardParams = {
    lang: string | null;
    timeRange: string | null;
    propertyType: string | null;
    municipality: string | null;
    distributionType: string | null;
  };