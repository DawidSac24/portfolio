// SandboxPage.tsx
import { useEffect } from "react";
import { EngineCore } from "../../engine/core/engine.core";
import { SandboxScene } from "../../engine/scenes/sandbox.scene";

export default function SandboxPage() {
  useEffect(() => {
    const engine = EngineCore.getInstance();

    engine.switchScene("sandbox", async () => {
      const scene = new SandboxScene();
      await scene.load();
      return scene;
    });

    return () => {
      engine.dropActiveScene();
    };
  }, []);

  return <div />;
}
