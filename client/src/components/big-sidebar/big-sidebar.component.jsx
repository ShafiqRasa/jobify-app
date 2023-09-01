// import { useAppContext } from '../context/appContext'
import { classNames } from "../../utils/class/joiner-classes.utils";
import Wrapper from "./big-sidebar-component.styles";
import Logo from "../logo/logo.component";
import NavLinks from "../nav-links/nav-links.component";
import { useAppContext } from "../../context/app.context";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={classNames(
          !showSidebar && "show-sidebar",
          "sidebar-container"
        )}
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
