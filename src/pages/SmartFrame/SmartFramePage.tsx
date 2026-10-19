// /src/pages/SmartFrame/SmartFramePage.tsx
import { useEffect } from "react";
import { useNav } from "../../components/Navigation/nav.context";
import { StickyScroller } from "../layouts/StickyScroller";

import { OverviewSection } from "./sections/OverviewSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FirmwareSection } from "./sections/FirmwareSection";
import { DifficultiesSection } from "./sections/DifficultiesSection";
import { FutureSection } from "./sections/FutureSection";
import { AnnexesSection } from "./sections/AnnexesSection";
import { Gallery } from "../../components/ui/Gallery";

export const SmartframePage = () => {
  const { setNavItems } = useNav();

  useEffect(() => {
    setNavItems([
      { id: "overview", label: "Overview" },
      { id: "features", label: "Features & Integrations" },
      { id: "firmware", label: "Firmware Architecture" },
      { id: "difficulties", label: "Encountered Difficulties" },
      { id: "update", label: "Future Iterations" },
      { id: "annexes", label: "Annexes" },
    ]);
    return () => setNavItems([]);
  }, [setNavItems]);

  return (
    <StickyScroller
      stickySide="left"
      stickyContent={
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Gallery
            items={[
              {
                url: "/videos/smartframe_test.mp4",
                title: "Spotify API Integration Demo",
                type: "video",
              },
              {
                url: "/images/weather_screen.jpg",
                title: "Weather API Screen",
                type: "image",
              },
            ]}
          />
          [Note: there should be a 3d model instead, but it isn't finished yet]
        </div>
      }
    >
      <OverviewSection />
      <FeaturesSection />
      <FirmwareSection />
      <DifficultiesSection />
      <FutureSection />
      <AnnexesSection />
    </StickyScroller>
  );
};
