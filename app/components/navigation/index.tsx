import { NavLink, useLocation, useSearchParams } from "@remix-run/react";
import styles from "./styles.module.css";
import Button from "../button";
import { Avatar } from "@mui/material";
import Dropdown from "../dropdown";
import { Translator } from "../../data/language/translator";

function Navigation() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const translator = new Translator("navigation");

  const isUser = false;

  return (
    <nav className={styles.root}>
      <div className={styles.startNavigation}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <NavLink
              to={`/?lang=${lang}&time_range=3m&property_type=residential&municipality=1&distribution_type=price_map`}
              className={
                pathname === "/"
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {translator.getTranslation(lang || "sr", "dashboardNav")}
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink
              to={`/portfolio/?lang=${lang}`}
              className={
                pathname === "/portfolio/"
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {translator.getTranslation(lang || "sr", "portfolioNav")}
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink
              to={`/partnership/?lang=${lang}`}
              className={
                pathname === "/partnership/"
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {translator.getTranslation(lang || "sr", "partnershipNav")}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.endNavigation}>
        <Dropdown
          name={lang || "sr"}
          options={[
            { value: "en", text: "en" },
            { value: "sr", text: "sr" },
          ]}
          onChange={(value) => {
            setSearchParams((prev) => {
              prev.set("lang", value);
              return prev;
            });
          }}
        />
        {isUser && (
          <Avatar
            sx={{
              width: " 36px",
              height: "36px",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0b90b",
              fontSize: "15px",
              lineHeight: "1",
              color: "#0b0e11",
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            JD
          </Avatar>
        )}

        <div className={styles.buttons}>
          {isUser ? (
            <Button
              text={translator.getTranslation(lang || "sr", "logoutNav")}
              size="small"
              variant="tertiary"
              onClick={() => console.log("Logout")}
            />
          ) : (
            <Button
              text={translator.getTranslation(lang || "sr", "loginNav")}
              size="small"
              variant="secondary"
              onClick={() => console.log("login")}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
