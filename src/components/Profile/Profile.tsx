import styles from './Profile.module.css';
import { Cpu, Code2, Music } from 'lucide-react';

export const Profile = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Hardware Engineer & Developer</h1>
      
      <p className={styles.bio}>
        Bridging the gap between embedded systems and interactive web experiences. 
        Currently building custom audio hardware and automated robotics.
      </p>

      <div className={styles.techStack}>
        <span className={styles.tag}><Cpu size={16} style={{ display: 'inline', marginRight: '8px' }} /> Embedded C/C++</span>
        <span className={styles.tag}><Code2 size={16} style={{ display: 'inline', marginRight: '8px' }} /> React & WebGL</span>
        <span className={styles.tag}><Music size={16} style={{ display: 'inline', marginRight: '8px' }} /> Audio Engineering</span>
      </div>
    </section>
  );
};