import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@client/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@client/shared/uikit';
import { Routing } from '@client/pages';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Routing>
        <App />
      </Routing>
      <CssBaseline />
    </ThemeProvider>
  </QueryClientProvider>,
  // </React.StrictMode>,
);
