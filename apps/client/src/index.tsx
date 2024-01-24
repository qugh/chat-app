import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@client/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@client/shared/uikit";
import { Routing } from "@client/pages";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Routing>
        <App />
      </Routing>
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>
);
