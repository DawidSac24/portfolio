import OverviewSection from "./sections/Overview.section";
import EducationSection from "./sections/Education.section";
import ExperienceSection from "./sections/Expirience.section";
import { useEffect } from "react";
import { useNav } from "../../components/Navigation/nav.context";
import styles from "../layout/PageLayout.module.css";
import PortfolioSection from "./sections/Portfolio.section";

export const Profile = () => {
  const { setNavItems } = useNav();

  useEffect(() => {
    setNavItems([
      { id: "overview", label: "About Me" },
      { id: "portfolio", label: "About this portfolio" },
      { id: "education", label: "Educational Background" },
      { id: "experience", label: "Work Experience" },
    ]);

    return () => setNavItems([]);
  }, [setNavItems]);

  return (
    <div className={styles.pageLayout}>
      <div className={styles.snapContainer}>
        <OverviewSection />
        <PortfolioSection />
        <EducationSection />
        <ExperienceSection />
      </div>
    </div>
  );
};
