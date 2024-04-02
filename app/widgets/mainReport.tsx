import { Box } from "@mui/material";
import { useSearchParams } from "@remix-run/react";
import { WidgetWrapper } from "../components/layout";
import Table from "../components/table";
import { listMainReportData } from "../utils/reports";
import { Translator } from "../data/language/translator";
import { LangType, MainReportTableData } from "../types/dashboard.types";
const MainReport = ({
  data,
}: {
  data: Record<string, MainReportTableData>;
}) => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") as LangType;
  const translator = new Translator("dashboard");
  const tableHeaders = [
    {
      key: "municipality",
      name: translator.getTranslation(lang!, "municipality"),
    },
    {
      key: "count",
      name: translator.getTranslation(lang!, "count"),
      sortable: true,
    },
    {
      key: "averageM2",
      name: translator.getTranslation(lang!, "averageM2"),
      sortable: true,
      financial: true,
    },
    {
      key: "averagePrice",
      name: translator.getTranslation(lang!, "averagePrice"),
      sortable: true,
      financial: true,
    },
    {
      key: "averageSize",
      name: translator.getTranslation(lang!, "averageSize"),
      sortable: true,
      financial: false,
      size: true,
    },
  ];
  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            width: "100%",
            mb: "20px",
          }}
        >
          <Table
            headers={tableHeaders}
            data={listMainReportData(data)}
            height={500}
          />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default MainReport;
