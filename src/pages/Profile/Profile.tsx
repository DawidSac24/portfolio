// /src/pages/Profile/Profile.tsx
import { useEffect } from "react";
import { useNav } from "../../components/Navigation/nav.context";
import { SnapScroller } from "../layouts/SnapScroller";
import OverviewSection from "./sections/OverviewSection";
import MyProjectsSection from "./sections/MyProjectsSection";
import PortfolioSection from "./sections/PortfolioSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExpirienceSection";

export const Profile = () => {
  const { setNavItems } = useNav();

  useEffect(() => {
    setNavItems([
      { id: "overview", label: "About Me" },
      { id: "projects", label: "My Projects" },
      { id: "portfolio", label: "About This Portfolio" },
      { id: "education", label: "Educational Background" },
      { id: "experience", label: "Work Experience" },
    ]);

    return () => setNavItems([]);
  }, [setNavItems]);

  return (
    <SnapScroller>
      <OverviewSection />
      <MyProjectsSection />
      <PortfolioSection />
      <EducationSection />
      <ExperienceSection />
    </SnapScroller>
  );
};
