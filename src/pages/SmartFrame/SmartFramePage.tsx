import { SideNav } from '../../components/Navigation/SideNav';
import { Section } from '../../components/ui/Section';
import layoutStyles from '../layout/PageLayout.module.css'

export const SmartframePage = () => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' }
  ];


  return (
    <div className={layoutStyles.pageLayout}>
      <SideNav items={navItems} />
      
      <div className={layoutStyles.mainContent}>
        {/* The rest of your Smartframe JSX remains exactly the same */}
        <Section id="overview" title="Smartframe Matrix">
        <div></div>
        </Section>
      </div>
    </div>
  );
};