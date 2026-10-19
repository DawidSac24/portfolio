import styles from "../../layouts/PageLayout.module.css";
import { Card } from "../../../components/ui/Card";

export const OverviewSection = () => (
  <section id="overview" className={styles.scrollSection}>
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className={styles.textContent}>
        <h2 className={styles.sectionHeading}>+-- SmartFrame --+</h2>
        <p className={styles.bioText} style={{ margin: 0 }}>
          An IoT-connected LED matrix that cycles through dynamic, real-time
          data screens. It displays the current time, local weather conditions,
          and live Spotify playback data, including the downsampled album art
          when a connected account is active.
        </p>
        <p className={styles.bioText} style={{ margin: 0 }}>
          The device is entirely self-sufficient, allowing users to toggle
          screens, upload custom images, and configure API integrations directly
          through an embedded local web dashboard hosted on the microcontroller.
        </p>
      </div>

      <Card>
        <p className={styles.bioText} style={{ margin: 0 }}>
          <strong style={{ color: "var(--tui-accent)" }}>
            [ PROJECT STATUS ]
          </strong>
          <br />
          The core project is functional and deployed, but it still has some
          small changes remaining to be completely finished. I am currently
          working on implementing the fluid animation screens and adding a few
          missing configuration settings to the web dashboard.
        </p>
      </Card>
    </div>
  </section>
);
