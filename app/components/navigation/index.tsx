import { NavLink, useLocation, useSearchParams } from "@remix-run/react";
import * as Avatar from "@radix-ui/react-avatar";
import {getTranslation} from '../../data/language';
import styles from "./styles.module.css";

function Navigation() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");

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
              {getTranslation((lang || 'sr'), 'dashboardNav')}
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink
              to={`/portfolio/?lang=${lang}`}
              className={
                pathname === "/portfolio"
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {getTranslation((lang || 'sr'), 'portfolioNav')}
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink
              to={`/partnership/?lang=${lang}`}
              className={
                pathname === "/partnership"
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {getTranslation((lang || 'sr'), 'partnershipNav')}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.endNavigation}>
        <select
          className={styles.lang}
          defaultValue={lang || "sr"}
          onChange={(event) =>
            setSearchParams((prev) => {
              prev.set("lang", event.target.value);
              return prev;
            })
          }
        >
          <option value="sr" className={styles.langOption}>
            SR
          </option>
          <option value="en" className={styles.langOption}>
            EN
          </option>
          <option value="ru" className={styles.langOption}>
            RU
          </option>
        </select>
        <Avatar.Root className={styles.avatarRoot}>
          <Avatar.Fallback className={styles.avatarFallback}>
            JD
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
    </nav>
  );
}

export default Navigation;
