// // SandboxPage.tsx
// import { Viewport3D } from "../../components/ui/ViewPort3D";
// import { ColoredAsciiEffect, ExhibitBuilder, SaturnModel, Scene } from "../../engine/src";

export default function SandboxPage() {
  return (
    <div></div>
    // <Viewport3D
    //   sceneId="sandbox"
    //   buildFn={async () => {
    //     const saturn = await new ExhibitBuilder(
    //       "/models/imports/saturn_-_ringed_planet/scene.gltf",
    //       SaturnModel,
    //     ).build();

    //     return new Scene()
    //       .addExhibit(saturn)
    //       .addEffect(new ColoredAsciiEffect({ charSize: 7.0 }));
    //   }}
    //   style={{ width: "100%", height: "80vh" }}
    // />
  );
}
