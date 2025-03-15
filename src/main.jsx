import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" autoClose={1500} />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
