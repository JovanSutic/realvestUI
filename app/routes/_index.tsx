import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Column, Line, Page } from "../components/layout";
import MainReport from "../widgets/MainReport";
import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import {
  NavLink,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import {
  RangeOption,
  getDateForReport,
  getDbDateString,
} from "../utils/dateTime";
import {
  getDataForMainReport,
  getOptions,
} from "../utils/reports";
import PieReport from "../widgets/PieReport";
import { isDashboardParamsValid } from "../utils/params";
import { MainReportTableData, MainReportType, PieReportType } from "../types/dashboard.types";

const mandatorySearchParams: Record<string, string> = {
  lang: "sr",
  timeRange: "3m",
  propertyType: "residential",
  municipality: "1",
  distributionType: "price_map",
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchType = new URL(request.url).searchParams.get("propertyType");
  const searchRange = new URL(request.url).searchParams.get("timeRange");
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
      `id, count, average_meter_price, min_average, max_average, date_to, municipality(
    id, name
  )`
    )
    .eq("type", `${searchType || mandatorySearchParams.propertyType}`)
    .gt("date_from", getDbDateString(startDate!));
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
    .gt("date_from", getDbDateString(startDate!));

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
      mainReportData: getDataForMainReport(
        mainReports as unknown as MainReportType[]
      ),
      pieReportData: pieReports || [],
      lastDate: mainReports[mainReports.length - 1].date_to,
      municipalities: municipalities || [],
    });
  }

  return json({ ok: true });
};


export default function Index() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const timeRange = searchParams.get("timeRange");
  const propertyType = searchParams.get("propertyType");
  const municipality = searchParams.get("municipality");
  const distributionType = searchParams.get(
    "distributionType"
  );

  const {
    mainReportData,
    lastDate,
    municipalities,
    pieReportData,
  }: {
    mainReportData: Record<string, MainReportTableData>;
    lastDate: string;
    municipalities: { id: number; name: string }[];
    pieReportData: PieReportType[];
  } = useLoaderData();


  if (!isDashboardParamsValid({
    lang,
    timeRange,
    propertyType,
    municipality,
    distributionType
  })
    
  ) {
    return (
      <NavLink
        to={`/?lang=${mandatorySearchParams.lang}&timeRange=${mandatorySearchParams.timeRange}&propertyType=${mandatorySearchParams.propertyType}&municipality=${mandatorySearchParams.municipality}&distributionType=${mandatorySearchParams.distributionType}`}
      >
        Sad ovde
      </NavLink>
    );
  }

  return (
    <Page>
      <Line>
        <Column size={2}>
          <MainReport data={mainReportData} validUntil={lastDate} />
        </Column>
        <Column size={2}>
          <PieReport
            municipalityList={getOptions(municipalities)}
            data={pieReportData}
          />
        </Column>
      </Line>
    </Page>
  );
}
