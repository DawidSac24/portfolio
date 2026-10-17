// /src/components/ui/Card.tsx
import React from "react";
import styles from "./ui.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`${styles.Card} ${className || ""}`}>
      <div className={styles.Body}>{children}</div>
    </div>
  );
};
