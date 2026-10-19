import styles from "../../layouts/PageLayout.module.css";

export const AnnexesSection = () => (
  <section id="annexes" className={styles.scrollSection}>
    <div className={styles.textContent}>
      <h2 className={styles.sectionHeading}>+-- Schematics & Media --+</h2>

      <div style={{ marginTop: "1rem" }}>
        <a
          href="https://oshwlab.com/ivaninraci/auto-mate"
          target="_blank"
          rel="noreferrer"
          className={styles.bioText}
          style={{ textDecoration: "none", display: "block" }}
        >
          {">"} View EasyEDA Schematics
        </a>
        <a
          href="https://github.com/DawidSac24/AutoMate"
          target="_blank"
          rel="noreferrer"
          className={styles.bioText}
          style={{ textDecoration: "none", display: "block" }}
        >
          {">"} View GitHub Repository
        </a>
      </div>
    </div>
  </section>
);
