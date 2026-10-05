import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/Navigation/Header";
import { Profile } from "./pages/Profile/Profile";
import { SmartframePage } from "./pages/SmartFrame/SmartFramePage";
import SandboxPage from "./pages/Sandbox/SandboxPage";

// Make sure to import your EngineCore
import { EngineCore } from "./engine/core/engine.core";

function App() {
  // 1. Create a reference for the global canvas container
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // 2. Instantiate and mount the engine once
    const engine = EngineCore.getInstance();
    engine.mount(canvasContainerRef.current);

    // 3. Teardown if the entire app unmounts
    return () => {
      engine.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* 
        THE STAGE: Fixed in the background. 
        It spans the whole screen but sits behind the UI.
      */}
      <div
        ref={canvasContainerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          backgroundColor: "#050505",
        }}
      />

      {/* 
        THE UI: Your standard React layout.
        Make sure your global CSS (index.css) does not put a solid 
        background color on the <body> tag, or it will hide the 3D canvas!
      */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/smartframe" element={<SmartframePage />} />
            <Route path="/sandbox" element={<SandboxPage />} />

            <Route
              path="/mbplayer"
              element={
                <div
                  style={{
                    color: "#a1a1aa",
                    padding: "4rem",
                    marginLeft: "150px",
                  }}
                >
                  MBPlayer coming soon...
                </div>
              }
            />
            <Route
              path="/automate"
              element={
                <div
                  style={{
                    color: "#a1a1aa",
                    padding: "4rem",
                    marginLeft: "150px",
                  }}
                >
                  Automate v2 coming soon...
                </div>
              }
            />
            <Route
              path="/engine"
              element={
                <div
                  style={{
                    color: "#a1a1aa",
                    padding: "4rem",
                    marginLeft: "150px",
                  }}
                >
                  3D Engine coming soon...
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
