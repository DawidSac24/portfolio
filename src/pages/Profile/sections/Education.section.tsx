import { ResumeEntry } from "../components/ResumeEntry";
import styles from "../../layout/PageLayout.module.css";

function EducationSection() {
  return (
    <section id="education" className={styles.snapSection}>
      <div
        className={styles.singleColContainer}
        style={{ "--max-w": "950px" } as React.CSSProperties}
      >
        <h2 className={styles.sectionHeading}>
          +-- Educational Background --+
        </h2>

        <div className={styles.textContentWide}>
          <ResumeEntry
            title="Haute École Léonard de Vinci"
            date="[Sep. 2025 -- Now]"
            subtitle="B.Sc. in Applied Computer Science"
            location="Brussels, Woluwe-Saint-Lambert"
          >
            <ul>
              <li>
                <strong>Courses:</strong> Linux Systems, C Programming, Data
                Structures & Algorithms, Web Development, DevOps
              </li>
            </ul>
          </ResumeEntry>

          <ResumeEntry
            title="INRACI (Institut de Radioélectricité et Cinématographie)"
            date="[Sep. 2022 -- Jun. 2025]"
            subtitle="Technical Qualification Degree in Electronics (CESS)"
            location="Brussels, Forest"
          >
            <ul>
              <li>
                <strong>Courses:</strong> Analog & Digital Electronics, Arduino
                Development, Schematic & PCB Design, Prototyping, 3D CAD
              </li>
              <li>
                <strong>Academic distinction:</strong> Jury prize for the final
                year project
              </li>
            </ul>
          </ResumeEntry>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
