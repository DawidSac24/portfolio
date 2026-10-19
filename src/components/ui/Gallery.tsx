import { useState } from "react";
import styles from "./Gallery.module.css";

export interface GalleryItem {
  url: string;
  title: string;
  type: "image" | "video";
}

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery = ({ items }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={styles.galleryContainer}>
      {/*  Top Header with Title */}
      <div className={styles.galleryHeader}>
        <span>[FILE] {currentItem.title}</span>
        <span className={styles.accentText}>LOADING_MEDIA...</span>
      </div>

      {/* Media Viewer */}
      <div className={styles.mediaWrapper}>
        {currentItem.type === "video" ? (
          <video
            key={currentItem.url}
            src={currentItem.url}
            autoPlay
            loop
            muted
            playsInline
            className={styles.mediaElement}
          />
        ) : (
          <img
            key={currentItem.url}
            src={currentItem.url}
            alt={currentItem.title}
            className={styles.mediaElement}
          />
        )}
      </div>

      {/*  Bottom Controls */}
      {items.length > 1 && (
        <div className={styles.galleryControls}>
          <button onClick={handlePrev} className={styles.controlBtn}>
            [ {"<"} PREV ]
          </button>
          <span className={styles.indicator}>
            {currentIndex + 1} / {items.length}
          </span>
          <button onClick={handleNext} className={styles.controlBtn}>
            [ NEXT {">"} ]
          </button>
        </div>
      )}
    </div>
  );
};
