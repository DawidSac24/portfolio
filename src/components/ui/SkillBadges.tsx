import { Badge } from "./Badge";
import styles from "./SkillBadges.module.css";

interface SkillBadgesProps {
  skills: string[];
  label?: string;
}

export const SkillBadges = ({
  skills,
  label = "Project technologies",
}: SkillBadgesProps) => (
  <div className={styles.skillList} aria-label={label}>
    {skills.map((skill) => (
      <Badge key={skill} name={skill} />
    ))}
  </div>
);
