import { Viewport3D } from "../../../components/ui/ViewPort3D";
import { ExhibitBuilder } from "../../../engine/builders/exhibit.builder";
import { ColoredAsciiEffect } from "../../../engine/modifiers/passes/ascii.effect";
import { Scene } from "../../../engine/scenes/scene";
import { SaturnModel } from "../../../engine/exhibits/saturn.exhibit";
import styles from "../../layout/PageLayout.module.css";

function PortfolioSection() {
  return (
    <section id="portfolio" className={styles.snapSection}>
      <div
        className={styles.sectionGrid}
        style={
          {
            "--col-text": "1.2fr" /* Give text slightly more space */,
            "--col-view": "1fr" /* Squeeze the 3D model slightly */,
            "--max-w": "1800px" /* Widen the entire section */,
            "--grid-gap": "3rem" /* Pull them closer together */,
          } as React.CSSProperties
        }
      >
        <div className={styles.viewportWrapper}>
          <div className={styles.viewportWrapper}>
            <Viewport3D
              sceneId="profile-saturn"
              buildFn={async () => {
                const saturn = await new ExhibitBuilder(
                  "/models/imports/saturn_-_ringed_planet/scene.gltf",
                  SaturnModel,
                  8,
                ).build();

                return new Scene().addExhibit(saturn).addEffect(
                  new ColoredAsciiEffect({
                    charSize: 6.0,
                    hoverRadius: 0.2,
                  }),
                );
              }}
              // Let width and height default to 100% to fill the .viewportWrapper box
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className={styles.textContent}>
          <h2 className={styles.sectionHeading}>
            +-- About this portfolio --+
          </h2>
          <p className={styles.bioText} style={{ margin: 0 }}>
            I built this portfolio to showcase my projects and challenge myself
            to create something genuinely fun and interactive. I wanted an
            original way to present my embedded systems work, using 3D models to
            make hardware engineering more readable and engaging than plain text
            on a resume.
          </p>
          <p className={styles.bioText} style={{ margin: 0 }}>
            Under the hood, it runs on a custom engine-like architecture built
            with React and Three.js. It features an event-driven interaction
            system, automated asset caching, and a modular rendering pipeline
            that allows me to inject custom GLSL shaders directly into the
            scenes, like the interactive ASCII post-processing effect you see
            here.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
