import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { Routing } from '@client/pages';
import { defaultThemeOptions } from '@client/shared/uikit';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const App: React.FC = () => {
  const queryClient = new QueryClient();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
    ...defaultThemeOptions,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Routing />
        <CssBaseline enableColorScheme />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
