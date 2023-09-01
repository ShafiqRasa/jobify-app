import Wrapper from "./small-sidebar-component.styles";
import { classNames } from "../../utils/class/joiner-classes.utils";
import { FaTimes } from "react-icons/fa";
import Logo from "../logo/logo.component";
import NavLinks from "../nav-links/nav-links.component";
import { useAppContext } from "../../context/app.context";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={classNames(
          showSidebar && "show-sidebar",
          "sidebar-container"
        )}
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={true} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
