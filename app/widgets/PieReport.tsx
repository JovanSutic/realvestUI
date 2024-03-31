import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { WidgetWrapper } from "../components/layout";
import { useSearchParams } from "@remix-run/react";
import Select from "../components/select";
import "chart.js/auto";
import {
  getDataForPie,
  numbersToPercentage,
} from "../utils/reports";
import ToggleButtons from "../components/toggleButtons";
import DoughnutChart from "../components/doughnutChart";
import EmptyChart from "../components/emptyChart";
import { Translator } from "../data/language/translator";
import { DistributionTypeKey, LangType, PieChartData, PieReportType, PropertyType } from "../types/dashboard.types";
import { DropdownOptions } from "../types/component.types";

const PieReport = ({
  municipalityList,
  data,
}: {
  municipalityList: DropdownOptions[];
  data: PieReportType[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") as LangType;
  const propertyType = searchParams.get("propertyType") as PropertyType;
  const municipality = searchParams.get("municipality");
  const distributionType = searchParams.get(
    "distributionType"
  ) as DistributionTypeKey;
  const translator = new Translator("dashboard");
  const chartData: PieChartData = getDataForPie(
    data,
    distributionType,
    propertyType!,
    {
      upto: translator.getTranslation(lang!, "pieUpto"),
      from: translator.getTranslation(lang!, "pieFrom"),
    }
  );

  return (
    <WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "16px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
              marginBottom: "16px",
            }}
          >
            <Typography component="h6" variant="h6" sx={{ fontWeight: "400" }}>
              {translator.getTranslation(lang!, "pieTitle")}
            </Typography>
            <Select
              value={municipality!}
              setValue={(value) => {
                setSearchParams(
                  (prev) => {
                    prev.set("municipality", value || municipality!);
                    return prev;
                  },
                  { preventScrollReset: true }
                );
              }}
              options={municipalityList || []}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              width: "100%",
              marginTop: "24px",
            }}
          >
            <ToggleButtons
              value={distributionType!}
              onChange={(value) => {
                setSearchParams(
                  (prev) => {
                    prev.set("distributionType", value || distributionType);
                    return prev;
                  },
                  { preventScrollReset: true }
                );
              }}
              options={[
                {
                  value: "average_price_map",
                  text: translator.getTranslation(lang!, "pieToggleM2"),
                },
                {
                  value: "price_map",
                  text: translator.getTranslation(lang!, "pieToggle"),
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            width: "100%",
            marginTop: "44px",
            marginBottom: "20px",
          }}
        >
          {chartData.labels.length ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    width: "80%",
                  }}
                >
                  <DoughnutChart
                    ratio={2}
                    id="salesDistribution"
                    labels={chartData.labels}
                    data={numbersToPercentage(chartData.data)}
                    label={
                      distributionType === "price_map"
                        ? translator.getTranslation(lang!, "pieUnitLabel")
                        : translator.getTranslation(lang!, "pieAverageLabel")
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    alignItems: "start",
                    width: "20%",
                  }}
                >
                  <List>
                    {chartData.labels.map((item, index) => (
                      <ListItem
                        key={item}
                        sx={{
                          padding: "0px",
                        }}
                      >
                        <ListItemText
                          sx={{
                            marginTop: "0px",
                            ".MuiListItemText-secondary": { fontSize: "12px" },
                          }}
                          secondary={`${item}: ${chartData.data[index]}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignSelf: "center",
                  width: "80%",
                  marginTop: "12px"
                }}
              >
                <Typography variant="body2" sx={{
                  fontSize: "10px",
                  fontStyle: "italic",
                }}>
                  {translator.getTranslation(lang!, "pieChartExplanation")}
                </Typography>
              </Box>
            </>
          ) : (
            <EmptyChart
              height={208}
              title={translator.getTranslation(lang!, "pieEmptyTitle")}
              subtitle={translator.getTranslation(lang!, "pieEmptySubtitle")}
            />
          )}
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default PieReport;
