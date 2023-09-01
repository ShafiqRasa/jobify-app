import { createContext, useReducer, useEffect, useContext } from "react";

const APP_ACTION_TYPES = {
  SET_ALERT: "app/SET_ALERT",
  DISMIS_ALERT: "app/DISMIS_ALERT",
  TOGGLE_SIDEBAR: "app/TOGGLE_SIDEBAR",
};

const initialState = {
  showSidebar: false,
  isAlert: false,
  alertText: "",
  alertType: "",
};

export const AppContext = createContext(initialState);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case APP_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        isAlert: true,
        alertType: payload.alertType,
        alertText: payload.alertText,
      };
    case APP_ACTION_TYPES.DISMIS_ALERT:
      return {
        ...state,
        isAlert: false,
        alertText: "",
        alertType: "",
      };
    case APP_ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlert = (data) =>
    dispatch({ type: APP_ACTION_TYPES.SET_ALERT, payload: data });
  const dismisAlert = () => dispatch({ type: APP_ACTION_TYPES.DISMIS_ALERT });

  const toggleSidebar = () =>
    dispatch({ type: APP_ACTION_TYPES.TOGGLE_SIDEBAR });

  const { alertText, alertType, isAlert, showSidebar } = state;

  const value = {
    alertText,
    alertType,
    isAlert,
    showSidebar,
    setAlert,
    toggleSidebar,
  };

  useEffect(() => {
    setTimeout(() => {
      dismisAlert();
    }, 3000);
  }, [setAlert]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
