import { useEffect, useRef } from "react";
import init, { init_engine } from "graphics_engine";
import { SideNav } from "../../components/Navigation/SideNav";
import layoutStyles from "../layout/PageLayout.module.css";

export const SmartframePage = () => {
  const initialized = useRef(false);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "specs", label: "Specifications" },
    { id: "gallery", label: "Gallery" },
  ];

  useEffect(() => {
    const loadWasm = async () => {
      if (initialized.current) return;

      // Initialize the Wasm memory
      await init();
      // Call your Rust function
      await init_engine("tui-canvas");

      initialized.current = true;
    };

    loadWasm();
  }, []);

  return (
    <div className={layoutStyles.pageLayout}>
      <SideNav items={navItems} />
      <div className={layoutStyles.mainContent}>
        <canvas
          id="tui-canvas"
          width={640}
          height={480}
          style={{ border: "1px dashed #3f3f46" }}
        ></canvas>
      </div>
    </div>
  );
};
