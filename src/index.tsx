import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "shared/uikit";
import { Routing } from "pages";

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
