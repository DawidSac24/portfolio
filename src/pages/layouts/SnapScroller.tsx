import React from "react";
import styles from "./SnapScroller.module.css";

interface SnapScrollerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SnapScroller = ({
  children,
  className,
  style,
}: SnapScrollerProps) => {
  return (
    <div className={styles.scrollerViewport} style={style}>
      <div className={`${styles.snapContainer} ${className || ""}`}>
        {children}
      </div>
    </div>
  );
};
