import { useEffect } from "react";
import { EngineCore } from "../../engine/core/engine.core";
// import { SaturnFactory } from "../../engine/exhibits/factories/saturn.factory";
import { CubeFactory } from "../../engine/exhibits/factories/cube.factory";
// Import your factories and singletons

const engine = EngineCore.getInstance();

export default function SandboxPage() {
  useEffect(() => {
    let isMounted = true; // Track if the user is still on this page

    new CubeFactory().build().then((exhibit) => {
      // Only set the exhibit if the user hasn't navigated away
      if (isMounted) {
        engine.setExhibit(exhibit);
      } else {
        // If they left, instantly dispose of the newly loaded model to save memory
        exhibit.dispose();
      }
    });

    engine.setDefaultLights(true);

    return () => {
      isMounted = false;
      engine.setExhibit(null);
    };
  }, []);
  return (
    <main>
      {/* Your standard HTML UI, buttons, and text go here */}
      <h1>Sandbox Page</h1>
    </main>
  );
}
