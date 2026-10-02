import React from 'react';
import styles from './ui.module.css';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className={styles.section}>
    <div className={styles.sectionTitle}>+-- {title} --+</div>
    <div className={styles.sectionContent}>{children}</div>
  </section>
);