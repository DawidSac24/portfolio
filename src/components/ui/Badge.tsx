import React from 'react';
import styles from './ui.module.css';

interface BadgeProps {
  name: string;
  icon?: React.ElementType;
}

export const Badge = ({ name, icon: Icon }: BadgeProps) => {
  return (
    <span className={styles.badge}>
      [{Icon && <Icon size={14} />} {name}]
    </span>
  );
};