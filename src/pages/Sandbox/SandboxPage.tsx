// SandboxPage.tsx
import { SandboxScene } from "../../engine/scenes/sandbox.scene";
import { Viewport3D } from "../../components/ui/ViewPort3D";

export default function SandboxPage() {
  return (
    <Viewport3D
      sceneId="sandbox"
      buildFn={async () => {
        const scene = new SandboxScene();
        await scene.load();
        return scene;
      }}
      style={{ width: "100%", height: "80vh" }}
    />
  );
}
