import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { INavLink } from "../../lib/types";
import { sidebarLinks } from "../../constants";
import { Loader } from "../../components/shared";
import { Button } from "../../components/ui/button";
import { useSignOutAccount } from "../../lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "../../context/AuthContext";

interface LeftSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className={`leftsidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/images/logo.jpg"
              alt="logo"
              className={`w-12 h-12 ${isCollapsed ? "hidden" : ""}`}
            />
            <div
              className={`text-black text-2xl font-bold ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              <span>Swap</span>
              <span className="text-gray-400">Ex</span>
            </div>
          </Link>

          {/* Menu button to toggle collapse state */}
          <button className="menu-toggle-btn" onClick={onToggle}>
            <img src="/images/menu.svg" alt="menu" className="w-6 h-6" />
          </button>
        </div>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/images/profile-placeholder.svg"}
              alt="profile"
              className={`h-14 w-14 rounded-full ${isCollapsed ? "hidden" : ""}`}
            />
            <div className={`flex flex-col ${isCollapsed ? "hidden" : ""}`}>
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive ? "bg-primary-500" : ""
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white w-6 h-6 ${
                      isActive ? "invert-white" : ""
                    }`}
                  />
                  <span className={`${isCollapsed ? "hidden" : ""}`}>
                    {link.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={handleSignOut}
      >
        <img src="/images/logout.svg" alt="logout" className="w-6 h-6" />
        <p
          className={`small-medium lg:base-medium ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          Logout
        </p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
