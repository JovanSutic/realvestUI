const navigation: Record<string, Record<string, string>> = {
  en: {
    portfolioHeader: "Welcome to portfolio",
    partnershipHeader: "Welcome to partnership",
    dashboardHeader: "Welcome to dashboard",
    portfolioNav: "Portfolio",
    partnershipNav: "Partnership",
    dashboardNav: "Dashboard",
  },
  sr: {
    portfolioHeader: "Dobrodošli na Portfolio",
    partnershipHeader: "Dobrodošli na Saradnja",
    dashboardHeader: "Dobrodošli na Pregled",
    portfolioNav: "Portfolio",
    partnershipNav: "Saradnja",
    dashboardNav: "Pregled",
  },
  ru: {
    portfolioHeader: "Дobro pozhalovat нa Портфолио",
    partnershipHeader: "Дobro pozhalovat нa Партнерство",
    dashboardHeader: "Дobro pozhalovat нa Панель приборов",
    portfolioNav: "Портфолио",
    partnershipNav: "Партнерство",
    dashboardNav: "Панель приборов",
  },
};

export const getTranslation = (language: string, position: string): string => {
  return navigation[language][position];
};
