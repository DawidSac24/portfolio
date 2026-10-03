import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>Dawid Sac</div>

      <nav className={styles.tabsList}>
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

        <span className={styles.separator}>my main projects |</span>

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
          to="/mbplayer"
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          MBPlayer
        </NavLink>

        <NavLink
          to="/automate"
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          Automate v2
        </NavLink>

        <NavLink
          to="/engine"
          className={({ isActive }) =>
            isActive
              ? `${styles.tabTrigger} ${styles.active}`
              : styles.tabTrigger
          }
        >
          3D Engine
        </NavLink>
      </nav>
    </header>
  );
};
