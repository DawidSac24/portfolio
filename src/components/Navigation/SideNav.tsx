import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

export interface NavItem {
  id: string;
  label: string;
}

export const SideNav = ({ items }: { items: NavItem[] }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <nav className={styles.sideNav}>
      <ul className={styles.navList}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.navLink} ${isActive ? styles.activeNav : ""}`}
              >
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
