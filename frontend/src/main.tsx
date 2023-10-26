import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./global.scss";
import "./index.css";
import { theme } from "./theme.ts";
import "dayjs/locale/es-mx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
        <ThemeProvider theme={theme}>
          <App />
          <ToastContainer hideProgressBar closeOnClick theme="colored" />
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
