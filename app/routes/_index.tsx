import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { getTranslation } from "../data/language";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>{getTranslation((lang || 'sr'), 'dashboardHeader')}</h1>
      </div>
    );
}
