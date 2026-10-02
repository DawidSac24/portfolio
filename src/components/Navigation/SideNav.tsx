import styles from './Navigation.module.css';

export interface NavItem {
  id: string;
  label: string;
}

export const SideNav = ({ items }: { items: NavItem[] }) => {
  return (
    <nav className={styles.sideNav}>
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={styles.navLink}>
              <span className={styles.navDot}></span>
              <span className={styles.navLabel}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};