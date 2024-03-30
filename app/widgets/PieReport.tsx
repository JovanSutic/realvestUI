import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { WidgetWrapper } from "../components/layout";
import { getTranslation } from "../data/language/dashboard";
import { useSearchParams } from "@remix-run/react";
import Select from "../components/select";
import { DropdownOptions } from "../components/dropdown";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  PieChartData,
  PieReportKey,
  PieReportType,
  getDataForPie,
  PropertyType,
  LangType,
} from "../utils/reports";
import ToggleButtons from "../components/toggleButtons";

const EmptyPieReport = ({
  height,
  title,
  subtitle,
}: {
  height: number;
  title: string;
  subtitle: string;
}) => {
  return (
    <Box
      sx={{
        height: `${height}px`,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        component="h6"
        variant="subtitle1"
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          marginBottom: "16px",
          fontWeight: "500",
        }}
      >
        {title}
      </Typography>
      <Typography
        component="h6"
        variant="subtitle2"
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          fontWeight: "400",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

const PieReport = ({
  municipalityList,
  data,
}: {
  municipalityList: DropdownOptions[];
  data: PieReportType[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") as LangType;
  const type = searchParams.get("type") as PropertyType;
  const municipality = searchParams.get("municipality");
  const pieType = searchParams.get("pieType") as PieReportKey;
  const chartData: PieChartData = getDataForPie(data, pieType, type!, lang!);

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
              {getTranslation(lang!, "pieTitle")}
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
              options={municipalityList}
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
              value={pieType!}
              onChange={(value) => {
                setSearchParams(
                  (prev) => {
                    prev.set("pieType", value || pieType);
                    return prev;
                  },
                  { preventScrollReset: true }
                );
              }}
              options={[
                {
                  value: "average_price_map",
                  text: getTranslation(lang!, "pieToggleM2"),
                },
                {
                  value: "price_map",
                  text: getTranslation(lang!, "pieToggle"),
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
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
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  width: "80%",
                }}
              >
                <Doughnut
                  datasetIdKey="salesPie"
                  data={{
                    labels: chartData.labels,
                    datasets: [
                      {
                        label:
                          pieType === "price_map"
                            ? getTranslation(lang!, "pieUnitLabel")
                            : getTranslation(lang!, "pieAverageLabel"),
                        data: chartData.data,
                        backgroundColor: [
                          "rgb(240, 185, 11)",
                          "rgb(142, 179, 49)",
                          "rgb(50, 160, 93)",
                          "rgb(0, 133, 119)",
                          "rgb(0, 102, 117)",
                          "rgb(47, 72, 88)",
                          "rgb(30, 37, 49)",
                          "rgb(152, 176, 169)",
                          "rgb(223, 224, 223)",
                          "rgb(193, 86, 76)",
                          "rgb(253, 138, 125)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{
                    aspectRatio: 2,
                    layout: {
                      padding: {
                        top: 1,
                        bottom: 0,
                        left: 1,
                        right: 12,
                      },
                    },
                    plugins: {
                      legend: {
                        position: "left",
                        labels: {
                          boxPadding: 10,
                          padding: 8,
                        },
                      },
                    },
                  }}
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
            </>
          ) : (
            <EmptyPieReport
              height={208}
              title={getTranslation(lang!, "pieEmptyTitle")}
              subtitle={getTranslation(lang!, "pieEmptySubtitle")}
            />
          )}
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default PieReport;
