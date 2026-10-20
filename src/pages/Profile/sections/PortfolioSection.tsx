// PortfolioSection.tsx
import { useEffect, useState } from "react";
import { Viewport3D } from "../../../components/ui/ViewPort3D";
import { ExhibitBuilder } from "../../../engine/builders/exhibit.builder";
import { ColoredAsciiEffect } from "../../../engine/modifiers/passes/ascii.effect";
import { Scene } from "../../../engine/scenes/scene";
import { SaturnModel } from "../../../engine/exhibits/profile/saturn.exhibit";
import styles from "../../layouts/PageLayout.module.css";

function PortfolioSection() {
  const [saturnSize, setSaturnSize] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches ? 5 : 7,
  );
  const [asciiCharSize, setAsciiCharSize] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches ? 3 : 6,
  );

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 768px)");
    const updateSaturnSize = (event: MediaQueryListEvent) => {
      setSaturnSize(event.matches ? 6 : 7);
      setAsciiCharSize(event.matches ? 3 : 6);
    };

    mobileViewport.addEventListener("change", updateSaturnSize);
    return () => {
      mobileViewport.removeEventListener("change", updateSaturnSize);
    };
  }, []);

  return (
    <section id="portfolio" className={styles.snapSection}>
      <div
        className={styles.sectionFlex}
        style={
          {
            "--max-w": "1500px", // Wider max container for Saturn's rings
            "--flex-view": "1 1 55%", // Give viewport 55% of the row
            "--flex-text": "1 1 45%", // Give text 45% of the row
            "--view-max-w": "800px", // Expand max width beyond default 650px
            "--view-h": "550px", // Ensure clean height
          } as React.CSSProperties
        }
      >
        <div className={styles.viewportWrapper}>
          <Viewport3D
            sceneId={`profile-saturn-${saturnSize}-${asciiCharSize}`}
            buildFn={async () => {
              const saturn = await new ExhibitBuilder(
                "/models/imports/saturn_-_ringed_planet/scene.gltf",
                SaturnModel,
                saturnSize,
              ).build();

              const scene = new Scene().addExhibit(saturn).addEffect(
                new ColoredAsciiEffect({
                  charSize: asciiCharSize,
                  hoverRadius: 0.2,
                }),
              );
              scene.camera.position.z = 4.5;

              return scene;
            }}
            style={{ width: "100%", height: "100%" }}
          />
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
