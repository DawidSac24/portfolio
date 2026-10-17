import React from "react";
import { Card } from "../../../components/ui/Card";
import styles from "./ResumeEntry.module.css";

interface ResumeEntryProps {
  title: string;
  date: string;
  subtitle: string;
  location: string;
  children?: React.ReactNode;
}

export function ResumeEntry({
  title,
  date,
  subtitle,
  location,
  children,
}: ResumeEntryProps) {
  return (
    <Card>
      <div className={styles.resumeRow}>
        <span className={styles.resumeTitle}>{title}</span>
        <span className={styles.resumeDate}>{date}</span>
      </div>
      <div className={styles.resumeRow}>
        <span className={styles.resumeSubtitle}>{subtitle}</span>
        <span className={styles.resumeLocation}>{location}</span>
      </div>
      {children && <div className={styles.resumeDetails}>{children}</div>}
    </Card>
  );
}
