import { useEffect, useState } from "react";
import { LinkBadge } from "../../../components/ui/Badge";
import { Viewport3D } from "../../../components/ui/ViewPort3D";
import {
  ColoredAsciiEffect,
  ExhibitBuilder,
  ImageExhibit,
  Scene,
} from "../../../engine/src";
import { BriefcaseBusiness, CodeXml, FileText } from "lucide-react";
import styles from "../../layouts/PageLayout.module.css";
import uiStyles from "../../../components/ui/ui.module.css";

function OverviewSection() {
  const [portraitWidth, setPortraitWidth] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches ? 6 : 8,
  );
  const [asciiCharSize, setAsciiCharSize] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches ? 3 : 6,
  );

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 768px)");
    const updatePortraitWidth = (event: MediaQueryListEvent) => {
      setPortraitWidth(event.matches ? 5.5 : 8);
      setAsciiCharSize(event.matches ? 3 : 6);
    };

    mobileViewport.addEventListener("change", updatePortraitWidth);
    return () => {
      mobileViewport.removeEventListener("change", updatePortraitWidth);
    };
  }, []);

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

          <div className={uiStyles.badgeGroup}>
            <LinkBadge name="My Resume" href="/resume" icon={FileText} />
            <LinkBadge
              name="GitHub"
              href="https://github.com/DawidSac24"
              icon={CodeXml}
              external
            />
            <LinkBadge
              name="LinkedIn"
              href="https://www.linkedin.com/in/dawid-sac/"
              icon={BriefcaseBusiness}
              external
            />
          </div>
        </div>

        <div className={styles.viewportWrapper}>
          <Viewport3D
            sceneId={`profile-portrait-${portraitWidth}-${asciiCharSize}`}
            buildFn={async () => {
              const width = portraitWidth;
              const height = width * 1.28536880290206;
              const profilePic = await new ExhibitBuilder(
                "/profile-no-bg.png",
                ImageExhibit,
                { width, height },
              ).build();

              return new Scene().addExhibit(profilePic).addEffect(
                new ColoredAsciiEffect({
                  charSize: asciiCharSize,
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
