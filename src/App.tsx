// /src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile/Profile";
import { SmartframePage } from "./pages/SmartFrame/SmartFramePage";
import { AppLayout } from "./pages/layouts/AppLayout";
import { NavProvider } from "./components/Navigation/NavProvider";
import { AutoMatePage } from "./pages/AutoMate/AutoMatePage";

function App() {
  return (
    <BrowserRouter>
      <NavProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Profile />} />
            <Route path="/smartframe" element={<SmartframePage />} />

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
            <Route path="/automate" element={<AutoMatePage />} />
          </Route>
        </Routes>
      </NavProvider>
    </BrowserRouter>
  );
}

export default App;
