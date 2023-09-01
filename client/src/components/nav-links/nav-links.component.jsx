import { NavLink } from "react-router-dom";
import { links } from "../../utils/links/links.utils";
import { useAppContext } from "../../context/app.context";
import { useDashboardContext } from "../../context/dashboard.context";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useAppContext();
  const {
    user: { role },
  } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        if (path === "admin" && role !== "admin") return;
        return (
          <div key={id} onClick={isBigSidebar ? null : toggleSidebar}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
