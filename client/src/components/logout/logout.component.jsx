import { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { classNames } from "../../utils/class/joiner-classes.utils";
import { useDashboardContext } from "../../context/dashboard.context";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useDashboardContext();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await api.get("/auth/logout");
      toast.success("successfully logout");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <div className="logout-container">
      <button
        type="button"
        className="btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={classNames(showLogout && "show-dropdown", "dropdown")}>
        <button type="button" className="dropdown-btn" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  );
};
export default Logout;
