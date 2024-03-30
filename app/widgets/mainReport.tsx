import { Box, Typography, Divider } from "@mui/material";
import { useSearchParams } from "@remix-run/react";
import { WidgetWrapper } from "../components/layout";
import Select from "../components/select";
import Table from "../components/table";
import { MainReportTableData, listMainReportData } from "../utils/reports";
import { getTranslation } from "../data/language/dashboard";
import ToggleButtons from "../components/toggleButtons";
import { setDateString } from "../utils/dateTime";
const MainReport = ({
  data,
  validUntil,
}: {
  data: Record<string, MainReportTableData>;
  validUntil: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const range = searchParams.get("range");
  const type = searchParams.get("type");
  const rangeOptions = ["3m", "6m", "1y", "3y", "5y", "10y"];
  const tableHeaders = [
    { key: "municipality", name: getTranslation(lang!, "municipality") },
    { key: "count", name: getTranslation(lang!, "count"), sortable: true },
    {
      key: "averageM2",
      name: getTranslation(lang!, "averageM2"),
      sortable: true,
      financial: true,
    },
    {
      key: "maxM2",
      name: getTranslation(lang!, "maxM2"),
      sortable: true,
      financial: true,
    },
    {
      key: "minM2",
      name: getTranslation(lang!, "minM2"),
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
            {getTranslation(lang!, "widgetTitle")}
          </Typography>
        </Box>
        <Box>
          <ToggleButtons
            value={range!}
            onChange={(value) => {
              setSearchParams((prev) => {
                prev.set("range", value || range!);
                return prev;
              }, { preventScrollReset: true });
            }}
            options={rangeOptions.map((item) => ({
              value: item,
              text: getTranslation(lang!, item),
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
              value={type || "residential"}
              setValue={(value) => {
                setSearchParams((prev) => {
                  prev.set("type", value || "residential");
                  return prev;
                }, { preventScrollReset: true });
              }}
              options={[
                {
                  value: "residential",
                  text: getTranslation(lang!, "residentialType"),
                },
                {
                  value: "commercial",
                  text: getTranslation(lang!, "commercialType"),
                },
                {
                  value: "parking",
                  text: getTranslation(lang!, "parkingType"),
                },
              ]}
            />
            <Typography variant="body2" component="h6">
              {`${getTranslation(lang!, "lastDate")} ${setDateString(validUntil, lang!)}`}
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
