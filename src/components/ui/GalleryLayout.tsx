import { useId, useState } from "react";
import { Gallery, type GalleryItem } from "./Gallery";
import styles from "./GalleryLayout.module.css";

interface GalleryLayoutProps {
  items: GalleryItem[];
  note?: string;
}

export const GalleryLayout = ({ items, note }: GalleryLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const galleryId = useId();

  return (
    <div
      className={`${styles.galleryLayout} ${
        isExpanded ? styles.expanded : ""
      }`}
    >
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={galleryId}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {isExpanded ? "[-] HIDE MEDIA" : "[+] SHOW MEDIA"}
      </button>
      <div className={styles.galleryPanel} id={galleryId}>
        <Gallery items={items} />
        {note && <p className={styles.note}>{note}</p>}
      </div>
    </div>
  );
};
