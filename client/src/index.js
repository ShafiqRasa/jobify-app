import React from "react";
import ReactDOM from "react-dom/client";
/**
 *  by importing this library,
 *  it may no longer do effect the browser's default styles on our web pages!
 *  simply we can say that provide style consistency across differen browsers
 * */
import "normalize.css"; // need to know ????
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/app.context";
import { UserProvider } from "./context/user.context";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <App />
        <ToastContainer position="top-center" />
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
