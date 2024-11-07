import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
// import Router from './routes/Router';
import AppRouter from './router/AppRouter';
import { CustomConfirmDialog } from './shared/components';
import { CustomBackdropLoader } from './shared/components/Loaders';
import { SocketProvider } from './context/SocketContext';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'simplebar-react/dist/simplebar.min.css';
import { useUiStore } from './store/ui';

const queryClient = new QueryClient();

function App() {
  const routing = useRoutes(AppRouter);
  const theme = ThemeSettings();
  const customizer = useUiStore(state => state.state);

  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            {routing}
            <CssBaseline />
            {/* ----- modal ----- */}
            <CustomConfirmDialog />
            {/* ----- loader ----- */}
            <CustomBackdropLoader />

            {/* ----- Toaster alerts ----- */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              limit={3}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />

            {/* <ScrollToTop>{routing}</ScrollToTop> */}
          </RTL>
        </ThemeProvider>
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default App;
