import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { getMuiLinks } from "./mui/getMuiLinks";
import { MuiMeta } from "./mui/MuiMeta";
import { MuiDocument } from "./mui/MuiDocument";
import appStyles from "./app.css?url";
import Navigation from "./components/navigation";
import { isMobile } from "./utils/params";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyles },
  ...getMuiLinks(),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userAgent = request.headers.get('user-agent');
  return json({ ok: true, mobile: isMobile(userAgent!), });
};

export function Layout({ children }: { children: React.ReactNode }) {

  const {mobile}: {mobile: boolean} = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <MuiMeta />
        <Links />
      </head>
      <body>
        <header>
          <Navigation mobile={mobile} />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MuiDocument>
      <Outlet />
    </MuiDocument>
  );
}
