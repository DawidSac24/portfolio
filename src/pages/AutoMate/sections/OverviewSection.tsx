import styles from "../../layouts/PageLayout.module.css";

export const OverviewSection = () => (
  <section id="overview" className={styles.scrollSection}>
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className={styles.textContent}>
        <h2 className={styles.sectionHeading}>+-- AutoMate Overview --+</h2>
        <p className={styles.bioText} style={{ margin: 0 }}>
          Auto-Mate is an automated chess game designed to give a new dimension
          to the classic board game[cite: 5]. By handling the remote movement of
          pieces mechanically, it bridges the physical and digital worlds,
          creating the possibility of playing chess online with physical pieces
          or playing directly against a robot[cite: 5].
        </p>
        <p className={styles.bioText} style={{ margin: 0 }}>
          The board is equipped with an interface screen for automatic
          operations, but also supports manual moves detected instantly by a
          grid of magnetic sensors located beneath the surface[cite: 5].
        </p>
      </div>
    </div>
  </section>
);
