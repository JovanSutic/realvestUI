import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import Navigation from "./components/navigation";
import { getMuiLinks } from "./mui/getMuiLinks";
import { MuiMeta } from "./mui/MuiMeta";
import { MuiDocument } from "./mui/MuiDocument";
import appStyles from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyles },
  ...getMuiLinks(),
];

export function Layout({ children }: { children: React.ReactNode }) {
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
          <Navigation />
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
