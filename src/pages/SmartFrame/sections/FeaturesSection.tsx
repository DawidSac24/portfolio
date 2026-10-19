import styles from "../../layouts/PageLayout.module.css";
import { Card } from "../../../components/ui/Card";

export const FeaturesSection = () => (
  <section id="features" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- Features --+</h2>
      <p className={styles.bioText} style={{ margin: 0 }}>
        The SmartFrame is designed as a modular display platform. Screens are
        managed by a central scheduler, with computationally heavy screens
        assigned dedicated FreeRTOS tasks to ensure fluid transitions and
        uninterrupted network polling.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          marginTop: "1rem",
        }}
      >
        <Card>
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.2rem" }}>
            {">"} Spotify Now Playing
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            Integrates with the Spotify Web API to detect active playback. The
            ESP32 parses the JSON payload, downloads the current track's album
            art, decodes the JPEG in-memory, and downscales it to fit the 64x64
            LED grid.
          </p>
        </Card>

        <Card>
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.2rem" }}>
            {">"} Live Weather & RTC Clock
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            Polls the OpenWeatherMap API for real-time local conditions.
            Timekeeping is maintained via an internal Real-Time Clock (RTC)
            synchronized periodically with NTP servers to prevent drift.
          </p>
        </Card>

        <Card>
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.2rem" }}>
            {">"} Custom Graphics & Animations
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            Supports rendering user-uploaded static images permanently saved in
            the ESP32's non-volatile memory (NVS).
          </p>
        </Card>

        <Card>
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.2rem" }}>
            {">"} Embedded Configuration Portal
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            Hosts a lightweight HTTP server serving a web interface straight
            from the ESP32's flash memory. Users on the local network can access
            the portal to configure Wi-Fi credentials, input API keys, adjust
            display brightness, and push new images over-the-air.
          </p>
        </Card>
      </div>
    </div>
  </section>
);
