import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Column, Line, Page } from "../components/layout";
import MainReport from '../widgets/mainReport';
import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { useLoaderData } from "@remix-run/react";
import { RangeOption, getDateForReport, getDbDateString } from "../utils/dateTime";
import { getDataForMainReport, MainReportTableData, MainReportType } from "../utils/reports";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchType = new URL(request.url).searchParams.get("type");
  const searchRange = new URL(request.url).searchParams.get("range");

  const startDate = getDateForReport(searchRange as RangeOption);

  const supabase = createClient(
    process.env.SUPABASE_URL_LOCAL!,
    process.env.SUPABASE_KEY_LOCAL!
  );
  const {data: reports, error} = await supabase.from("contract_report").select(`id, count, average_meter_price, min_average, max_average, municipality(
    id, name
  )`).eq("type", `${searchType}`).gte("date_from", getDbDateString(startDate!));
  if (error) {
    console.log(error);
  }

  if(reports?.length) {
    const result = getDataForMainReport(reports as unknown as MainReportType[]);
    return json(result);
  }

  return json({ ok: true });
};

export default function Index() {
  const data: Record<string, MainReportTableData> = useLoaderData();
  
  return (
    <Page>
      <Line>
        <Column size={2}>
          <MainReport data={data} />
        </Column>
      </Line>
    </Page>
  );
}
