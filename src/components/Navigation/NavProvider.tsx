import { useState, type ReactNode } from "react";
import type { NavItem } from "./SideNav";
import { NavContext } from "./nav.context";

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  return (
    <NavContext.Provider value={{ navItems, setNavItems }}>
      {children}
    </NavContext.Provider>
  );
};
