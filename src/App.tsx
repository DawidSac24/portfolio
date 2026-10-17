import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/Navigation/Header";
import { Profile } from "./pages/Profile/Profile";
import { SmartframePage } from "./pages/SmartFrame/SmartFramePage";
import SandboxPage from "./pages/Sandbox/SandboxPage";

function App() {
  return (
    <BrowserRouter>
      <div
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

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/smartframe" element={<SmartframePage />} />
            {import.meta.env.DEV && (
              <Route path="/sandbox" element={<SandboxPage />} />
            )}

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
                  Automate coming soon...
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
