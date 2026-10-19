import styles from "../../layouts/PageLayout.module.css";

export const AnnexesSection = () => (
  <section id="annexes" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- Annexes & Source --+</h2>
      <a
        href="https://github.com/DawidSac24/SmartFrame"
        className={styles.bioText}
      >
        {">"} GitHub Repository (Firmware)
      </a>
      <a href="#" className={styles.bioText}>
        {">"} DashBoard Website // Not added
      </a>
      <a href="#" className={styles.bioText}>
        {">"} 3D CAD Files (Bezel) // Not added
      </a>
    </div>
  </section>
);
