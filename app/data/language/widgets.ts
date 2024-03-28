const mainReportWidget: Record<string, Record<string, string>> = {
  en: {
    "3m": "3m",
    "6m": "6m",
    "1y": "1y",
    "3y": "3y",
    "5y": "5y",
    "10y": "10y",
    widgetTitle: "Sales report",
    residentialType: "Residential",
    parkingType: "Parking",
    commercialType: "Commercial",
    municipality: "Municipality",
    count: "Number of sales",
    averageM2: "Average price per m2",
    maxM2: "Max price per m2",
    minM2: "Min price per m2"
  },
  sr: {
    "3m": "3m",
    "6m": "6m",
    "1y": "1g",
    "3y": "3g",
    "5y": "5g",
    "10y": "10g",
    widgetTitle: "Prodajni izveštaj",
    residentialType: "Rezidencijalni",
    parkingType: "Parking",
    commercialType: "Komercijalni",
    municipality: "Opštine",
    count: "Broj prodaja",
    averageM2: "Prosečna cena m2",
    maxM2: "Max cena m2",
    minM2: "Min cena m2"
  },
  ru: {
    "3m": "3m",
    "6m": "6m",
    "1y": "1y",
    "3y": "3y",
    "5y": "5y",
    "10y": "10y",
    widgetTitle: "Sales statistics",
    residentialType: "Residential",
    parkingType: "Parking",
    commercialType: "Commercial",
    municipality: "Municipality",
    count: "Number of sales",
    averageM2: "Average price per m2",
    maxM2: "Max price per m2",
    minM2: "Min price per m2"
  },
};

export const getTranslation = (language: string, position: string): string => {
  return mainReportWidget[language][position];
};
