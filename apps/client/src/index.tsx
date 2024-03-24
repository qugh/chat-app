import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@client/shared/uikit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Routing } from '@client/pages';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Routing />
      <CssBaseline />
    </ThemeProvider>
  </QueryClientProvider>,
  // </React.StrictMode>,
);
