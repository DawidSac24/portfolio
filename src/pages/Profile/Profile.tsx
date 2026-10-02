import { GitCommit, BriefcasePlus, FileText, Cpu, Code2, Music } from 'lucide-react';
import { Badge } from '../../components//ui/Badge';
import { Section } from '../../components/ui/Section'
import { SideNav } from '../../components/Navigation/SideNav';
import styles from './Profile.module.css';

export const Profile = () => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' }
  ];

  return (
    <div className={styles.pageLayout}>
      <SideNav items={navItems} />
      
      <div className={styles.mainContent}>
        <Section id="overview" title="Hardware Engineer & Developer">
          <div className={styles.profileHeader}>
            {/* Placeholder for Profile Picture */}
            <div className={styles.profileImage}></div>
            
            <div className={styles.bioContainer}>
              <p>
                Bridging the gap between embedded systems and interactive web experiences. 
                Currently building custom audio hardware and automated robotics.
              </p>
              
              <div className={styles.techStack}>
                <Badge name="Embedded C/C++" icon={Cpu} />
                <Badge name="React & WebGL" icon={Code2} />
                <Badge name="Audio Eng." icon={Music} />
              </div>

              <div className={styles.links}>
                <a href="#" className={styles.link}><GitCommit size={20} /> GitHub</a>
                <a href="#" className={styles.link}><BriefcasePlus size={20} /> LinkedIn</a>
                <a href="#" className={styles.link}><FileText size={20} /> Resume</a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Work Experience">
          <p>[ Future Work Experience Entries Here ]</p>
        </Section>

        <Section id="education" title="Educational Background">
          <p>Technical Electrician Studies (Completed)</p>
          <p>[ Future Engineering Degrees Here ]</p>
        </Section>
      </div>
    </div>
  );
};