import { Link } from "react-router-dom";
import styles from "./ResumePage.module.css";

export const ResumePage = () => (
  <main className={styles.resumePage}>
    <div className={styles.toolbar}>
      <Link to="/" className={styles.backLink}>
        [&lt; BACK TO PROFILE]
      </Link>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className={styles.openLink}
      >
        [OPEN PDF]
      </a>
    </div>
    <iframe
      className={styles.resumeFrame}
      src="/resume.pdf"
      title="Dawid Sac resume"
    />
  </main>
);
