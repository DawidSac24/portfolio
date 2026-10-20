import React from "react";
import styles from "./ui.module.css";

interface BadgeProps {
  name: string;
  icon?: React.ElementType;
}

export const Badge = ({ name }: BadgeProps) => {
  return <span className={styles.badge}>[{name}]</span>;
};
