import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../../context/dashboard.context";
import { Wrapper } from "./theme-toggle-component.styles";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
