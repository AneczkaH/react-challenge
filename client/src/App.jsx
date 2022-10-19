import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Router from './pages/routing';
import { theme } from 'theme';
import {SnackbarProvider} from 'notistack';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}> 
      <SnackbarProvider 
        maxSnack={3} 
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} 
        classes={{ variantSuccess: theme.palette.success, variantError: theme.palette.error}}
      >
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
        </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
