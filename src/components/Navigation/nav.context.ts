// /src/components/Navigation/nav.context.ts
import { createContext, useContext } from "react";
import type { NavItem } from "./SideNav";

export interface NavContextType {
  navItems: NavItem[];
  setNavItems: (items: NavItem[]) => void;
}

export const NavContext = createContext<NavContextType>({
  navItems: [],
  setNavItems: () => {},
});

export const useNav = () => useContext(NavContext);
