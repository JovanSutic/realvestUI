import { Box } from "@mui/material";
import Card from "../components/card";
import { CardsReport, LangType } from "../types/dashboard.types";
import { Translator } from "../data/language/translator";
import { useSearchParams } from "@remix-run/react";

const DashboardCards = ({ cards }: { cards: CardsReport }) => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") as LangType;
  const translator = new Translator("dashboard");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        width: "100%",
        mb: "20px",
      }}
    >
      {(Object.keys(cards || {}) as unknown as Array<keyof CardsReport>)?.map(
        (item) => (
          <Card
            key={item}
            label={translator.getTranslation(lang!, cards[item].labelKey)}
            value={cards[item].value}
            changeValue={cards[item].changeValue!}
          />
        )
      )}
    </Box>
  );
};

export default DashboardCards;
