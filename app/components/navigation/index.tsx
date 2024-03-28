import { NavLink, useLocation, useSearchParams } from "@remix-run/react";
import { getTranslation } from "../../data/language/navigation";
import styles from "./styles.module.css";
import Button from "../button";
import { Avatar } from "@mui/material";
import Dropdown from "../dropdown";

function Navigation() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");

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
              to={`/?lang=${lang}`}
              className={
                pathname === "/"
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {getTranslation(lang || "sr", "dashboardNav")}
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
              {getTranslation(lang || "sr", "portfolioNav")}
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
              {getTranslation(lang || "sr", "partnershipNav")}
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
              prev.set("lang", value as string);
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
              text={getTranslation(lang || "sr", "logoutNav")}
              size="small"
              variant="tertiary"
              onClick={() => console.log("Logout")}
            />
          ) : (
            <Button
              text={getTranslation(lang || "sr", "loginNav")}
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
