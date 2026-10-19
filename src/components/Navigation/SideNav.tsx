// /src/components/Navigation/SideNav.tsx
import { useEffect, useState } from "react";
import { useNav } from "./nav.context";
import styles from "./Navigation.module.css";

export interface NavItem {
  id: string;
  label: string;
}

export const SideNav = () => {
  const { navItems } = useNav();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (navItems.length === 0) return;

    const sectionElements = navItems
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
  }, [navItems]);

  if (navItems.length === 0) return null;

  const currentActiveId = navItems.some((item) => item.id === activeId)
    ? activeId
    : (navItems[0]?.id ?? "");

  // THE FIX: Intercept the click and force it to scroll to the CENTER
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault(); // Stop the native top-jump
    const targetElement = document.getElementById(id);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center", // Forces the section into the middle of the screen!
      });

      // Silently update the URL hash so history still works
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav className={styles.sideNav}>
      <ul className={styles.navList}>
        {navItems.map((item) => {
          const isActive = currentActiveId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)} // Attach the new handler
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
