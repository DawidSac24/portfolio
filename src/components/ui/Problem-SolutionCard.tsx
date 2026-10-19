import { Card } from "./Card";
import styles from "../../pages/layouts/PageLayout.module.css";

interface ProblemSolutionProps {
  problemTitle: string;
  problemDesc: string;
  solutionDesc: string;
}

export const ProblemSolutionCard = ({
  problemTitle,
  problemDesc,
  solutionDesc,
}: ProblemSolutionProps) => (
  <Card>
    <div style={{ marginBottom: "1.5rem" }}>
      <h3
        style={{
          color: "#ef4444",
          fontSize: "1.1rem",
          margin: "0 0 0.5rem 0",
          fontFamily: "monospace",
        }}
      >
        [!] PROBLEM:{" "}
        <span style={{ color: "var(--tui-text)" }}>{problemTitle}</span>
      </h3>
      <p className={styles.bioText} style={{ margin: 0 }}>
        {problemDesc}
      </p>
    </div>
    <div>
      <h3
        style={{
          color: "var(--tui-accent)",
          fontSize: "1.1rem",
          margin: "0 0 0.5rem 0",
          fontFamily: "monospace",
        }}
      >
        [v] SOLUTION:
      </h3>
      <p className={styles.bioText} style={{ margin: 0 }}>
        {solutionDesc}
      </p>
    </div>
  </Card>
);
