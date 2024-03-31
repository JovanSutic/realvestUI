import { Box, Typography, Divider } from "@mui/material";
import { useSearchParams } from "@remix-run/react";
import { WidgetWrapper } from "../components/layout";
import Select from "../components/select";
import Table from "../components/table";
import { LangType, MainReportTableData, PropertyType, listMainReportData } from "../utils/reports";
import ToggleButtons from "../components/toggleButtons";
import { setDateString } from "../utils/dateTime";
import { Translator } from "../data/language/translator";
const MainReport = ({
  data,
  validUntil,
}: {
  data: Record<string, MainReportTableData>;
  validUntil: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang")  as LangType;
  const timeRange = searchParams.get("timeRange");
  const propertyType = searchParams.get("propertyType") as PropertyType;
  const timeRangeOptions = ["3m", "6m", "1y", "3y", "5y", "10y"];
  const translator = new Translator("dashboard");
  const tableHeaders = [
    { key: "municipality", name: translator.getTranslation(lang!, "municipality") },
    { key: "count", name: translator.getTranslation(lang!, "count"), sortable: true },
    {
      key: "averageM2",
      name: translator.getTranslation(lang!, "averageM2"),
      sortable: true,
      financial: true,
    },
    {
      key: "maxM2",
      name: translator.getTranslation(lang!, "maxM2"),
      sortable: true,
      financial: true,
    },
    {
      key: "minM2",
      name: translator.getTranslation(lang!, "minM2"),
      sortable: true,
      financial: true,
    },
  ];
  return (
    <WidgetWrapper>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <Box>
          <Typography variant="h5" component="h5">
            {translator.getTranslation(lang!, "widgetTitle")}
          </Typography>
        </Box>
        <Box>
          <ToggleButtons
            value={timeRange!}
            onChange={(value) => {
              setSearchParams((prev) => {
                prev.set("timeRange", value || timeRange!);
                return prev;
              }, { preventScrollReset: true });
            }}
            options={timeRangeOptions.map((item) => ({
              value: item,
              text: translator.getTranslation(lang!, item),
            }))}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "24px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Select
              value={propertyType || "residential"}
              setValue={(value) => {
                setSearchParams((prev) => {
                  prev.set("propertyType", value || "residential");
                  return prev;
                }, { preventScrollReset: true });
              }}
              options={[
                {
                  value: "residential",
                  text: translator.getTranslation(lang!, "residentialType"),
                },
                {
                  value: "commercial",
                  text: translator.getTranslation(lang!, "commercialType"),
                },
                {
                  value: "parking",
                  text: translator.getTranslation(lang!, "parkingType"),
                },
              ]}
            />
            <Typography variant="body2" component="h6">
              {`${translator.getTranslation(lang!, "lastDate")} ${setDateString(validUntil, lang!)}`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            width: "100%",
            mb: "20px"
          }}
        >
          <Table headers={tableHeaders} data={listMainReportData(data)} />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default MainReport;
