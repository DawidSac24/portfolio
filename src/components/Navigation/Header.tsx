import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerLogo} ${styles.headerTitle}`}>
        Dawid Sac
      </div>
      <div className={`${styles.headerLogo} ${styles.headerStatus}`}>
        [Work in progress...]
      </div>
      <nav className={styles.tabsList} aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/smartframe"
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          Smartframe
        </NavLink>
        <NavLink
          to="/automate"
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          Automate
        </NavLink>
        <NavLink
          to="/mbplayer"
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          MBPlayer
        </NavLink>
      </nav>
    </header>
  );
};
