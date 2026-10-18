import { Outlet } from "react-router-dom";
import { Header } from "../../components/Navigation/Header";
import { SideNav } from "../../components/Navigation/SideNav";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <SideNav />
      <Outlet />
    </>
  );
};
