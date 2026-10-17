import { SideNav } from "../../components/Navigation/SideNav";
import styles from "./Profile.module.css";
import OverviewSection from "./sections/Overview.section";
import EducationSection from "./sections/Education.section";
import ExperienceSection from "./sections/Expirience.section";
import PortfolioSection from "./sections/Portfolio.section";

export const Profile = () => {
  const navItems = [
    { id: "overview", label: "About Me" },
    { id: "portfolio", label: "About this portfolio" },
    { id: "education", label: "Educational Background" },
    { id: "experience", label: "Work Experience" },
  ];

  return (
    <div className={styles.pageLayout}>
      <SideNav items={navItems} />

      <div className={styles.snapContainer}>
        <OverviewSection />
        <PortfolioSection />
        <EducationSection />
        <ExperienceSection />
      </div>
    </div>
  );
};
