import styles from "../../layouts/PageLayout.module.css";

export const FirmwareSection = () => (
  <section id="firmware" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- Firmware Architecture --+</h2>
      <p className={styles.bioText} style={{ margin: 0 }}>
        Built natively on the ESP-IDF framework using FreeRTOS. The architecture
        separates network logic, HTTP hosting, and display rendering into
        distinct, thread-safe tasks communicating via queues, resulting in a
        highly stable, non-blocking operating loop.
      </p>
    </div>
  </section>
);
