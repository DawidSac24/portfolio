import { Section } from "../../components/ui/Section";
import { SideNav } from "../../components/Navigation/SideNav";
import styles from "./Profile.module.css";

export const Profile = () => {
  const navItems = [
    { id: "overview", label: "About Me" },
    { id: "education", label: "Educational Background" },
    { id: "experience", label: "Work Experience" },
  ];

  return (
    <div className={styles.pageLayout}>
      <SideNav items={navItems} />

      <div className={styles.mainContent}>
        <Section id="overview" title="About Me">
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}></div>

            <div className={styles.bioContainer}>
              <p>
                Hi! My name is Dawid and i am a Computer Science Student. I am
                passionate about Informatics & Electronics. I would like to
                bridge the gap between both worlds by pursuing my career in
                Embedded Systems/Firmware Engineering.
                <br />
                <br />
                Although i dont have any professional experience in this field
                yet, i strive to work diligently and fit into the role. To
                pursue that dream, I studied electronics in technnical school,
                and later transitioned into computer science when enrolling into
                college. Aside from studies, i also work on personal projects in
                the goal of improving my skills and learning from my past
                mistakes.
              </p>
            </div>
          </div>
        </Section>

        <Section id="education" title="Educational Background">
          <div className={styles.resumeItem}>
            <div className={styles.resumeRow}>
              <span className={styles.resumeTitle}>
                Haute École Léonard de Vinci
              </span>
              <span className={styles.resumeDate}>Sep. 2025 -- Now</span>
            </div>
            <div className={styles.resumeRow}>
              <span className={styles.resumeSubtitle}>
                B.Sc. in Applied Computer Science
              </span>
              <span className={styles.resumeLocation}>
                Brussels, Woluwe-Saint-Lambert
              </span>
            </div>
            <div className={styles.resumeDetails}>
              <ul>
                <li>
                  <strong>Courses:</strong> Linux Systems, C Programming, Data
                  Structures & Algorithms, Web Development, DevOps
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.resumeItem}>
            <div className={styles.resumeRow}>
              <span className={styles.resumeTitle}>
                INRACI (Institut de Radioélectricité et Cinématographie)
              </span>
              <span className={styles.resumeDate}>Sep. 2022 -- Jun. 2025</span>
            </div>
            <div className={styles.resumeRow}>
              <span className={styles.resumeSubtitle}>
                Technical Qualification Degree in Electronics (CESS)
              </span>
              <span className={styles.resumeLocation}>Brussels, Forest</span>
            </div>
            <div className={styles.resumeDetails}>
              <ul>
                <li>
                  <strong>Courses:</strong> Analog & Digital Electronics,
                  Arduino Developement, Schematic & PCB Design, Prototyping, 3D
                  CAD
                </li>
                <li>
                  <strong>Academic distinction:</strong> Jury prize for the
                  final year project
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Work Experience">
          <div className={styles.resumeItem}>
            <div className={styles.resumeRow}>
              <span className={styles.resumeTitle}>
                Private Computer Science Tutor
              </span>
              <span className={styles.resumeDate}>Sep. 2025 -- Jan. 2026</span>
            </div>
            <div className={styles.resumeRow}>
              <span className={styles.resumeSubtitle}>
                One-on-one coaching for a 1st-year B.Sc. Computer Science
                student
              </span>
              <span className={styles.resumeLocation}>Brussels</span>
            </div>
          </div>

          <div className={styles.resumeItem}>
            <div className={styles.resumeRow}>
              <span className={styles.resumeTitle}>
                Private Mathematics & Physics Tutor
              </span>
              <span className={styles.resumeDate}>May 2024 -- Jun. 2025</span>
            </div>
            <div className={styles.resumeRow}>
              <span className={styles.resumeSubtitle}>
                Academic coaching for a 3rd-year secondary school student
              </span>
              <span className={styles.resumeLocation}>Brussels</span>
            </div>
          </div>

          <div className={styles.resumeItem}>
            <div className={styles.resumeRow}>
              <span className={styles.resumeTitle}>Dishwasher and Waiter</span>
              <span className={styles.resumeDate}>May 2025 -- Jul. 2026</span>
            </div>
            <div className={styles.resumeRow}>
              <span className={styles.resumeSubtitle}>Walkin'Thai</span>
              <span className={styles.resumeLocation}>Brussels, Ixelles</span>
            </div>
          </div>

          <div className={styles.resumeItem}>
            <div className={styles.resumeRow}>
              <span className={styles.resumeTitle}>
                Convenience Store Cashier
              </span>
              <span className={styles.resumeDate}>Aug. 2024 -- Mar. 2025</span>
            </div>
            <div className={styles.resumeRow}>
              <span className={styles.resumeSubtitle}>Chez Pawel</span>
              <span className={styles.resumeLocation}>Brussels, Uccle</span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
