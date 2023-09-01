import { createContext, useReducer } from "react";

const USER_ACTION_TYPES = {
  SET_USER: "app/SET_USER",
  REGISTER_USER: "app/REGISTER_USER",
};

const initialState = {
  user: {},
};

export const UserContext = createContext(initialState);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: { email: payload.currentUser.email },
      };
    case USER_ACTION_TYPES.REGISTER_USER:
      return {
        ...state,
        user: payload.currentUser,
      };
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = ({ endPoint, ...otherProps }) => {
    switch (endPoint) {
      case "login":
        dispatch({ type: USER_ACTION_TYPES.SET_USER, payload: otherProps });
        break;
      case "register":
        dispatch({
          type: USER_ACTION_TYPES.REGISTER_USER,
          payload: otherProps,
        });
        break;
    }
  };

  const { user } = state;

  const value = { setUser, user };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
