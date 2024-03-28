import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { getTranslation } from "../data/language/navigation";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Partnership" },
  ];
};

export default function Partnership() {
    const [searchParams] = useSearchParams();
    const lang = searchParams.get("lang");
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>{getTranslation((lang || 'sr'), 'partnershipHeader')}</h1>
      </div>
    );
}
