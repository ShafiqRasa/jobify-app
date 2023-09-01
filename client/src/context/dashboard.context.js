import { useReducer, useContext, createContext, useEffect } from "react";
import { api } from "../utils/api/api.utils";
import { useNavigate, useLocation } from "react-router-dom";

const DASHBOARD_TYPES = {
  SET_USER: "dashboard/SET_USER",
  TOGGLE_THEME: "dashboard/TOGGLE_THEME",
};

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const defaultTheme = checkDefaultTheme();
const initialState = {
  isDarkTheme: defaultTheme,
  user: {},
};

export const DashboardContext = createContext(initialState);

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case DASHBOARD_TYPES.TOGGLE_THEME:
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    case DASHBOARD_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }
};

export const DashboardProvider = ({ children }) => {
  const [state, dispath] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleTheme = () => {
    const newTheme = !state.isDarkTheme;
    localStorage.setItem("darkTheme", newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    dispath({ type: DASHBOARD_TYPES.TOGGLE_THEME });
  };
  const { isDarkTheme, user } = state;
  const value = { isDarkTheme, toggleTheme, user };

  const setUser = (user) =>
    dispath({
      type: DASHBOARD_TYPES.SET_USER,
      payload: user,
    });

  const getCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await api.get("/users/current-user");
      setUser(user);
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, [pathname, null]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
