import { Box, Typography } from "@mui/material";
import { WidgetWrapper } from "../components/layout";
import { useSearchParams } from "@remix-run/react";
import { LangType, PropertyType } from "../types/dashboard.types";
import { RangeOption, formatDate } from "../utils/dateTime";
import { Translator } from "../data/language/translator";
import ToggleButtons from "../components/toggleButtons";
import Select from "../components/select";

const DashboardControls = ({ validUntil }: { validUntil: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") as LangType;
  const timeRange = searchParams.get("time_range") as RangeOption;
  const propertyType = searchParams.get("property_type") as PropertyType;
  const timeRangeOptions = ["3m", "6m", "1y", "3y", "5y", "10y"];
  const translator = new Translator("dashboard");
  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h5">
            {translator.getTranslation(lang!, "widgetTitle")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <Select
              value={propertyType || "residential"}
              minWidth={160}
              setValue={(value) => {
                setSearchParams(
                  (prev) => {
                    prev.set("property_type", value || "residential");
                    return prev;
                  },
                  { preventScrollReset: true }
                );
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

            <ToggleButtons
              value={timeRange!}
              onChange={(value) => {
                setSearchParams(
                  (prev) => {
                    prev.set("time_range", value || timeRange!);
                    return prev;
                  },
                  { preventScrollReset: true }
                );
              }}
              options={timeRangeOptions.map((item) => ({
                value: item,
                text: translator.getTranslation(lang!, item),
              }))}
            />
          </Box>
          <Box sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "8px",
            }}>
            <Typography variant="body2" component="h6">
              {`${translator.getTranslation(lang!, "lastDate")} ${formatDate(
                validUntil,
                lang!
              )}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default DashboardControls;
