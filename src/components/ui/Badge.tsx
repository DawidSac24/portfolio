import type { LucideIcon } from "lucide-react";
import styles from "./ui.module.css";

interface BadgeProps {
  name: string;
  icon?: LucideIcon;
}

export const Badge = ({ name, icon: Icon }: BadgeProps) => {
  return (
    <span className={styles.badge}>
      {Icon && <Icon className={styles.badgeIcon} aria-hidden="true" size={14} />}
      [{name}]
    </span>
  );
};

interface LinkBadgeProps extends BadgeProps {
  href: string;
  external?: boolean;
}

export const LinkBadge = ({
  name,
  href,
  icon: Icon,
  external = false,
}: LinkBadgeProps) => {
  return (
    <a
      className={`${styles.badge} ${styles.linkBadge}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {Icon && <Icon className={styles.badgeIcon} aria-hidden="true" size={14} />}
      [{name}]
    </a>
  );
};
