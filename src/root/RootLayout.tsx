import { Outlet } from "react-router-dom";
import { useState } from "react";
import Topbar from "../components/shared/Topbar";
import Bottombar from "../components/shared/BottomBar";
import LeftSidebar from "../components/shared/LeftSideBar";

const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Topbar />
      <LeftSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <section
        className={`flex flex-1 h-full transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-[80px]' : 'md:ml-[270px]'
        } ml-0`}
      >
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;


