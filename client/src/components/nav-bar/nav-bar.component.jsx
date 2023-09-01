import Wrapper from "./nav-bar-component.styles";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "../logo/logo.component";
import { useAppContext } from "../../context/app.context";
import Logout from "../logout/logout.component";
import ThemeToggle from "../theme-toggle/theme-toggle.component";

const Navbar = () => {
  // const { toggleSidebar, logoutUser, user } = useAppContext()
  const { toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="toggle-and-logout-container">
          <ThemeToggle />
          <div className="btn-container">
            <Logout />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
