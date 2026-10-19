// /src/pages/AutoMate/sections/SpecificationsSection.tsx
import styles from "../../layouts/PageLayout.module.css";
import { Card } from "../../../components/ui/Card";

export const SpecificationsSection = () => (
  <section id="specs" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>
        +-- Technical Specifications --+
      </h2>
      <p className={styles.bioText} style={{ margin: 0 }}>
        The system relies on 32 magnetized pieces and operates in 1 or 2 player
        modes, handling both automatic piece movement and automatic
        detection[cite: 5].
      </p>

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
            {">"} Processing & Interface
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            className={styles.bioText}
          >
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>MCU:</strong>{" "}
              Arduino Nano[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Display:</strong>{" "}
              Nextion NX3224T024 color graphical resistive touchscreen (320×240
              pixels)[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Inputs:</strong> 2
              arcade buttons[cite: 5]
            </li>
          </ul>
        </Card>

        <Card>
          <h3
            className={styles.sectionHeading}
            style={{ fontSize: "1.1rem", color: "var(--tui-text)" }}
          >
            {">"} Sensing Matrix
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            className={styles.bioText}
          >
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Detection:</strong>{" "}
              64x Reed Switches (Dia 2 x 14.5 mm)[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>
                Multiplexing:
              </strong>{" "}
              4x SparkFun CD74HC4067 MUX breakouts[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Homing:</strong> 2x
              Micro Limit switch rollers for X/Y calibration[cite: 5]
            </li>
          </ul>
        </Card>

        <Card>
          <h3
            className={styles.sectionHeading}
            style={{ fontSize: "1.1rem", color: "var(--tui-text)" }}
          >
            {">"} Kinematics & Actuation
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            className={styles.bioText}
          >
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Motors:</strong> 2x
              Adafruit Nema 17 Stepper Motors (200 steps/rev, 12V 350mA)[cite:
              5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Drivers:</strong>{" "}
              2x Pololu A4988 Stepper Motor Driver Carriers[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Actuator:</strong>{" "}
              5Kg Holding Force Electromagnet driven by a TIP 120 Power
              Transistor and 1N4001 diode[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>
                Transmission:
              </strong>{" "}
              V-slot 20x20 linear rails with 3.5m GT2 Belt and 20-tooth
              pulleys[cite: 5]
            </li>
          </ul>
        </Card>

        <Card>
          <h3
            className={styles.sectionHeading}
            style={{ fontSize: "1.1rem", color: "var(--tui-text)" }}
          >
            {">"} Chassis & Power
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            className={styles.bioText}
          >
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>
                Power Supply:
              </strong>{" "}
              12V, 2A[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>
                Dimensions:
              </strong>{" "}
              496 mm x 496 mm x 100 mm[cite: 5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Enclosure:</strong>{" "}
              6 plywood faces with a dedicated area for eliminated pieces[cite:
              5]
            </li>
            <li>
              <strong style={{ color: "var(--tui-accent)" }}>Weight:</strong> 4
              kg[cite: 5]
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </section>
);
