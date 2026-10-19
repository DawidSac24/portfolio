import styles from "../../layouts/PageLayout.module.css";
import { Card } from "../../../components/ui/Card";

export const HardwareSection = () => (
  <section id="hardware" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- Hardware & Mechanics --+</h2>
      <p className={styles.bioText} style={{ margin: 0 }}>
        The system relies on a hidden XY table transmission system driven by GT2
        belts and Nema 17 stepper motors.
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
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.1rem" }}>
            {">"} Microcontroller & Interface
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            An Arduino Nano acts as the core brain, controlling the motors,
            reading sensor data, and managing communications with a 320x240
            color graphical resistive touchscreen via an asynchronous UART
            serial bus.
          </p>
        </Card>

        <Card>
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.1rem" }}>
            {">"} Magnetic Electromagnet System
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            A 5Kg holding force electromagnet is attached to the XY axes
            underneath the board. It activates to lock onto the magnetized chess
            pieces and drag them to their target squares automatically. X and Y
            limit switches calibrate the magnet's position at startup to prevent
            misalignments.
          </p>
        </Card>

        <Card>
          <h3 className={styles.sectionHeading} style={{ fontSize: "1.1rem" }}>
            {">"} Multiplexed Sensor Grid
          </h3>
          <p className={styles.bioText} style={{ margin: 0 }}>
            64 individual Reed switches are placed under the board to determine
            the presence of pieces. Four CD74HC4067 multiplexers are used to
            successively read the signals from the 8x8 grid and send the data to
            the microprocessor.
          </p>
        </Card>
      </div>
    </div>
  </section>
);
