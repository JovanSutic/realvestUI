import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Column, Line, Page } from "../components/layout";
import MainReport from "../widgets/MainReport";
import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { NavLink, useLoaderData, useSearchParams } from "@remix-run/react";
import {
  RangeOption,
  getDateForReport,
  getDbDateString,
} from "../utils/dateTime";
import {
  getDataForMainCards,
  getDataForMainReport,
  getOptions,
} from "../utils/reports";
import PieReport from "../widgets/PieReport";
import { isDashboardParamsValid } from "../utils/params";
import {
  CardsReport,
  MainReportTableData,
  MainReportType,
  PieReportType,
} from "../types/dashboard.types";
import DashboardControls from "../widgets/DashboardControls";
import DashboardCards from "../widgets/DashboardCards";

const mandatorySearchParams: Record<string, string> = {
  lang: "sr",
  time_range: "3m",
  property_type: "residential",
  municipality: "1",
  distribution_type: "price_map",
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchType = new URL(request.url).searchParams.get("property_type");
  const searchRange = new URL(request.url).searchParams.get("time_range");
  const searchMunicipality = new URL(request.url).searchParams.get(
    "municipality"
  );

  const startDate = getDateForReport(
    (searchRange || mandatorySearchParams.timeRange) as RangeOption
  );

  const supabase = createClient(
    process.env.SUPABASE_URL_LOCAL!,
    process.env.SUPABASE_KEY_LOCAL!
  );

  const { data: mainReports, error: mainError } = await supabase
    .from("contract_report")
    .select(
      `id, count, sum_price, average_meter_price, min_average, sum_size, max_average, date_to, municipality(
    id, name
  )`
    )
    .eq("type", `${searchType || mandatorySearchParams.propertyType}`)
    .gt("date_from", getDbDateString(startDate!, "en"))
    .returns<MainReportType[]>();
  if (mainError) {
    console.log(mainError);
  }

  const { data: pieReports, error: pieError } = await supabase
    .from("pie_contract_report")
    .select(
      `id, price_map, average_price_map, date_to, municipality(
    id, name
  )`
    )
    .eq("type", `${searchType || mandatorySearchParams.propertyType}`)
    .eq(
      "municipality",
      `${searchMunicipality || mandatorySearchParams.municipality}`
    )
    .gt("date_from", getDbDateString(startDate!, "en"));

  if (pieError) {
    console.log(pieError);
  }

  const { data: municipalities, error: municipalitiesError } = await supabase
    .from("municipalities")
    .select();

  if (municipalitiesError) {
    console.log(municipalitiesError);
  }

  if (mainReports?.length) {
    return json({
      mainReportData: getDataForMainReport(mainReports),
      mainCardsData: getDataForMainCards(mainReports),
      pieReportData: pieReports || [],
      lastDate: mainReports[mainReports.length - 1].date_to,
      municipalities: municipalities || [],
      lineReportData: mainReports.filter(
        (item) => item.municipality.id === Number(searchMunicipality)
      ),
    });
  }

  return json({ ok: true });
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const timeRange = searchParams.get("time_range");
  const propertyType = searchParams.get("property_type");
  const municipality = searchParams.get("municipality");
  const distributionType = searchParams.get("distribution_type");

  const {
    mainReportData,
    lastDate,
    municipalities,
    pieReportData,
    lineReportData,
    mainCardsData,
  }: {
    mainReportData: Record<string, MainReportTableData>;
    lastDate: string;
    municipalities: { id: number; name: string }[];
    pieReportData: PieReportType[];
    lineReportData: MainReportType[];
    mainCardsData: CardsReport;
  } = useLoaderData();

  if (
    !isDashboardParamsValid({
      lang,
      timeRange,
      propertyType,
      municipality,
      distributionType,
    })
  ) {
    return (
      <NavLink
        to={`/?lang=${mandatorySearchParams.lang}&time_range=${mandatorySearchParams.time_range}&property_type=${mandatorySearchParams.property_type}&municipality=${mandatorySearchParams.municipality}&distribution_type=${mandatorySearchParams.distribution_type}`}
      >
        Sad ovde
      </NavLink>
    );
  }

  return (
    <Page>
      <Line>
        <Column size={5}>
          <DashboardControls validUntil={lastDate} />
        </Column>
      </Line>
      <Line>
        <Column size={3}>
          <DashboardCards cards={mainCardsData} />
          <MainReport data={mainReportData} />
        </Column>
        <Column size={2}>
          <PieReport
            municipalityList={getOptions(municipalities)}
            lineData={lineReportData}
            data={pieReportData}
          />
        </Column>
      </Line>
    </Page>
  );
}
