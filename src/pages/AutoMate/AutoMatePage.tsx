import { useEffect } from "react";
import { useNav } from "../../components/Navigation/nav.context";
import { StickyScroller } from "../layouts/StickyScroller";
import { Gallery } from "../../components/ui/Gallery";
import { OverviewSection } from "./sections/OverviewSection";
import { HardwareSection } from "./sections/HardwareSection";
import { FirmwareSection } from "./sections/FirmwareSection";
import { AnnexesSection } from "./sections/AnnexesSection";
import { SpecificationsSection } from "./sections/SpecificationsSection";

export const AutoMatePage = () => {
  const { setNavItems } = useNav();

  useEffect(() => {
    setNavItems([
      { id: "overview", label: "Overview" },
      { id: "hardware", label: "Hardware & Mechanics" },
      { id: "firmware", label: "Firmware & AI" },
      { id: "specs", label: "Specifications" },
      { id: "annexes", label: "Schematics & Media" },
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
                title: "ChessBoard image",
                url: "/images/automate.jpg",
                type: "image",
              },
              {
                title: "AutoMate Action Demo",
                url: "/videos/automate-demo.mp4",
                type: "video",
              },
              {
                title: "Schematic without Connectors",
                url: "/images/automate-schematic.png",
                type: "image",
              },
              {
                title: "PCB design",
                url: "/images/automate-pcb.png",
                type: "image",
              },
            ]}
          />
          [Note: there should be a 3d model instead, but it isn't finished yet]
        </div>
      }
    >
      <OverviewSection />
      <HardwareSection />
      <FirmwareSection />
      <SpecificationsSection />
      <AnnexesSection />
    </StickyScroller>
  );
};
