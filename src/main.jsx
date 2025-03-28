import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" autoClose={1500} />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
