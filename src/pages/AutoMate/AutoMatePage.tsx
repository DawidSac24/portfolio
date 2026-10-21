import { useEffect } from "react";
import { useNav } from "../../components/Navigation/nav.context";
import { StickyScroller } from "../layouts/StickyScroller";
import { OverviewSection } from "./sections/OverviewSection";
import { HardwareSection } from "./sections/HardwareSection";
import { FirmwareSection } from "./sections/FirmwareSection";
import { AnnexesSection } from "./sections/AnnexesSection";
import { SpecificationsSection } from "./sections/SpecificationsSection";
import { GalleryLayout } from "../../components/ui/GalleryLayout";

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
        <GalleryLayout
          items={[
            {
              title: "ChessBoard image",
              url: "/automate/automate.jpg",
              type: "image",
            },
            {
              title: "AutoMate Action Demo",
              url: "/automate/automate-demo.mp4",
              type: "video",
            },
            {
              title: "Schematic without Connectors",
              url: "/automate/automate-schematic.png",
              type: "image",
            },
            {
              title: "PCB design",
              url: "/automate/automate-pcb.png",
              type: "image",
            },
          ]}
          note="[Note: there should be a 3d model instead, but it isn't finished yet]"
        />
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
