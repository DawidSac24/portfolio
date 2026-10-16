// import {
//   GitCommit,
//   BriefcasePlus,
//   FileText,
//   Cpu,
//   Code2,
//   Music,
// } from "lucide-react";
// import { Badge } from "../../components//ui/Badge";
import { Section } from "../../components/ui/Section";
import { SideNav } from "../../components/Navigation/SideNav";
import styles from "./Profile.module.css";

export const Profile = () => {
  const navItems = [
    { id: "overview", label: "About Me" },
    { id: "this-portfolio", label: "About This Portfolio" },
    { id: "education", label: "Educational Background" },
    { id: "experience", label: "Work Experience" },
  ];

  return (
    <div className={styles.pageLayout}>
      <SideNav items={navItems} />

      <div className={styles.mainContent}>
        <Section id="overview" title="About Me">
          <div className={styles.profileHeader}>
            {/* Placeholder for Profile Picture */}
            <div className={styles.profileImage}></div>

            <div className={styles.bioContainer}>
              <p>
                Hi! My name is Dawid and i am a Computer Science Student. I am
                passionate about Informatics & Electronics. I would like to
                bridge the gap between both worlds by pursuing my career in
                Embedded Systems/Firmware Engineering.
                <br />
                Although i dont have any professional experience in this field
                yet, i strive to work diligently and fit into the role. To
                porsue that dream, I studied electronics in technnical school,
                and later transitioned into computer science when enrolling into
                college. Aside from studies, i also work on personal projects in
                the goal of improving my skills and learning from my past
                mistakes.
              </p>

              {/* <div className={styles.techStack}>
                <Badge name="Embedded C/C++" icon={Cpu} />
                <Badge name="React & WebGL" icon={Code2} />
              </div>

              <br />
              <div className={styles.links}>
                <a href="#" className={styles.link}>
                  <GitCommit size={20} /> GitHub
                </a>
                <a href="#" className={styles.link}>
                  <BriefcasePlus size={20} /> LinkedIn
                </a>
                <a href="#" className={styles.link}>
                  <FileText size={20} /> Resume
                </a>
              </div> */}
            </div>
          </div>
        </Section>

        <Section id="this-portfolio" title="About this portfolio">
          <p></p>
        </Section>

        <Section id="education" title="Educational Background">
          <p>
            <h3>Bachelor in aplied Computer Science</h3>
            Haute ´Ecole L´eonard de Vinci
            <h5>Sep. 2025 – Now</h5>Courses: Linux Systems, C Programming, Data
            Structures & Algorithms, Web Development, DevOps
          </p>
          <p>
            <h3>Technical Qualification Degree in Electronics (CESS) </h3>
            INRACI (Institut de Radio´electricit´e et Cin´ematographie)
            <h5>Sep. 2022 – Jun. 2025</h5>
            Courses: Analog & Digital Electronics, Arduino Developement,
            Schematic & PCB Design, Prototyping, 3D CAD
            <h5>Academic distinction: Jury prize for the final year project</h5>
          </p>
        </Section>

        <Section id="experience" title="Work Experience">
          <p>
            Private Computer Science Tutor Sep. 2025 – Jan. 2026 One-on-one
            coaching for a 1st-year B.Sc. Computer Science student Brussels
            Private Mathematics & Physics Tutor May 2024 – Jun. 2025 Academic
            coaching for a 3rd-year secondary school student Brussels Dishwasher
            and Waiter May 2025 – Jul. 2026 Walkin’Thai Brussels, Ixelles
            Convenience Store Cashier Aug. 2024 – Mar. 2025 Chez Pawel Brussels,
            Uccle
          </p>
        </Section>
      </div>
    </div>
  );
};
