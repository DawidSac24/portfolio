import React from "react";
import { SnapScroller } from "./SnapScroller";
import styles from "./StickyScroller.module.css";

interface StickyScrollerProps {
  stickyContent: React.ReactNode;
  children: React.ReactNode;
  stickySide?: "left" | "right";
  maxContentWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StickyScroller = ({
  stickyContent,
  children,
  stickySide = "left",
  maxContentWidth = "1600px",
  className,
  style,
}: StickyScrollerProps) => {
  return (
    <div className={styles.scrollViewport} style={style}>
      <div
        className={`${styles.container} ${className || ""}`}
        style={
          {
            "--max-content-w": maxContentWidth,
            flexDirection: stickySide === "right" ? "row-reverse" : "row",
          } as React.CSSProperties
        }
      >
        {/* Sticky Visual Stage */}
        <aside className={styles.stickyColumn}>
          <div className={styles.stickyStage}>{stickyContent}</div>
        </aside>

        {/* Scrolling Narrative Content */}
        <main className={styles.scrollContent}>
          <SnapScroller embedded>{children}</SnapScroller>
        </main>
      </div>
    </div>
  );
};
