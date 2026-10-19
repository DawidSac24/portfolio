import styles from "../../layouts/PageLayout.module.css";
import { Card } from "../../../components/ui/Card";

export const FutureSection = () => (
  <section id="update" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- What I would change --+</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Card>
          <strong style={{ color: "var(--tui-accent)" }}>
            [+] Custom PCB Design
          </strong>
          <p className={styles.bioText} style={{ margin: "0.5rem 0 0 0" }}>
            Move away from the Adafruit MatrixPortal and design a custom
            ESP32-S3 PCB to integrate a dedicated I2S audio DAC and better power
            delivery.
          </p>
        </Card>
        <Card>
          <strong style={{ color: "var(--tui-accent)" }}>
            [+] Hardware PSRAM
          </strong>
          <p className={styles.bioText} style={{ margin: "0.5rem 0 0 0" }}>
            Add external PSRAM to bypass heap fragmentation entirely, allowing
            for full-screen GIF caching and smooth 60fps animations.
          </p>
        </Card>
        *Things that i am currently working on
        <Card>
          <strong style={{ color: "var(--tui-accent)" }}>
            [+] Animation Screens
          </strong>
          <p className={styles.bioText} style={{ margin: "0.5rem 0 0 0" }}>
            Adding custom animation screens, like a 'game of life' screen, a
            rain and falling text like in matrix annimation. Each of them will
            have a color parameter in the dashboard.
          </p>
        </Card>
        <Card>
          <strong style={{ color: "var(--tui-accent)" }}>[+] 3D Model</strong>
          <p className={styles.bioText} style={{ margin: "0.5rem 0 0 0" }}>
            Making a 3D model of the LED matrix to showcase it on this portfolio
            with custom animated screens from the project
          </p>
        </Card>
      </div>
    </div>
  </section>
);
