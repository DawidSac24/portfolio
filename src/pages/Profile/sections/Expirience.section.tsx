import { ResumeEntry } from "../components/ResumeEntry";
import styles from "../../layout/PageLayout.module.css";

function ExperienceSection() {
  return (
    <section id="experience" className={styles.snapSection}>
      <div className={styles.textContentWide}>
        <h2 className={styles.sectionHeading}>+-- Work Experience --+</h2>

        <ResumeEntry
          title="Private Computer Science Tutor"
          date="[Sep. 2025 -- Jan. 2026]"
          subtitle="One-on-one coaching for a 1st-year B.Sc. Computer Science student"
          location="Brussels"
        />

        <ResumeEntry
          title="Private Mathematics & Physics Tutor"
          date="[May 2024 -- Jun. 2025]"
          subtitle="Academic coaching for a 3rd-year secondary school student"
          location="Brussels"
        />

        <ResumeEntry
          title="Dishwasher and Waiter"
          date="[May 2025 -- Jul. 2026]"
          subtitle="Walkin'Thai"
          location="Brussels, Ixelles"
        />

        <ResumeEntry
          title="Convenience Store Cashier"
          date="[Aug. 2024 -- Mar. 2025]"
          subtitle="Chez Pawel"
          location="Brussels, Uccle"
        />
      </div>
    </section>
  );
}

export default ExperienceSection;
