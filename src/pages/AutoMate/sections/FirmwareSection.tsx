import styles from "../../layouts/PageLayout.module.css";
import { Card } from "../../../components/ui/Card";

export const FirmwareSection = () => (
  <section id="firmware" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- Firmware & AI --+</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "1rem",
        }}
      >
        <Card>
          <h3
            className={styles.sectionHeading}
            style={{ fontSize: "1.1rem", color: "var(--tui-text)" }}
          >
            {">"} Min-Max Algorithm & Alpha-Beta Pruning
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            To allow users to play against a robot, the firmware implements an
            AI engine. It utilizes the Min-Max algorithm paired with Alpha-Beta
            pruning, which efficiently evaluates board states while ignoring
            unnecessary calculations and unwanted branches in the decision tree.
          </p>
        </Card>

        <Card>
          <h3
            className={styles.sectionHeading}
            style={{ fontSize: "1.1rem", color: "#ef4444" }}
          >
            [!] Hardware Workarounds
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            During PCB assembly, the Nextion touchscreen was accidentally routed
            to incorrect microcontroller pins. Instead of refabricating the
            board, I adapted the firmware to use the <code>SoftwareSerial</code>{" "}
            library, allowing manual UART communication over the alternate pins
            to keep the project moving forward.
          </p>
        </Card>
      </div>
    </div>
  </section>
);
