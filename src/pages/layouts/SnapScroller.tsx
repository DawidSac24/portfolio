import React from "react";
import styles from "./SnapScroller.module.css";

interface SnapScrollerProps {
  children: React.ReactNode;
  embedded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SnapScroller = ({
  children,
  embedded = false,
  className,
  style,
}: SnapScrollerProps) => {
  return (
    <div
      className={`${styles.scrollerViewport} ${
        embedded ? styles.embeddedViewport : ""
      }`}
      style={style}
    >
      <div className={`${styles.snapContainer} ${className || ""}`}>
        {children}
      </div>
    </div>
  );
};
