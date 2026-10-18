import { Viewport3D } from "../../../components/ui/ViewPort3D";
import { ExhibitBuilder } from "../../../engine/builders/exhibit.builder";
import { ImageExhibit } from "../../../engine/exhibits/image.exhibit";
import { ColoredAsciiEffect } from "../../../engine/modifiers/passes/ascii.effect";
import { Scene } from "../../../engine/scenes/scene";
import styles from "../../layout/PageLayout.module.css";

function OverviewSection() {
  return (
    <section id="overview" className={styles.snapSection}>
      <div
        className={styles.sectionFlex}
        style={
          {
            "--max-w": "1350px",
            "--flex-text": "1 1 52%",
            "--flex-view": "1 1 48%",
            "--text-pl": "2.5rem",
          } as React.CSSProperties
        }
      >
        <div className={styles.textContent}>
          <h2 className={styles.sectionHeading}>+-- About Me --+</h2>
          <p className={styles.bioText} style={{ margin: 0 }}>
            Hi! My name is Dawid and I am a computer science student. I am
            passionate about informatics and electronics, and my goal is to
            bridge the gap between both worlds by pursuing a career in Embedded
            Systems and Firmware Engineering.
          </p>
          <p className={styles.bioText} style={{ margin: 0 }}>
            To build a strong hardware foundation, I studied electronics in
            technical school before transitioning into software by enrolling in
            college for computer science. I continuously push myself through
            complex personal projects, constantly exploring new technologies and
            using my mistakes as stepping stones to improve.
          </p>
        </div>

        <div className={styles.viewportWrapper}>
          <Viewport3D
            sceneId="profile-portrait"
            buildFn={async () => {
              const width = 8;
              const height = width * 1.28536880290206;
              const profilePic = await new ExhibitBuilder(
                "/profile-no-bg.png",
                ImageExhibit,
                { width, height },
              ).build();

              return new Scene().addExhibit(profilePic).addEffect(
                new ColoredAsciiEffect({
                  charSize: 6.0,
                  hoverRadius: 0.2,
                }),
              );
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
