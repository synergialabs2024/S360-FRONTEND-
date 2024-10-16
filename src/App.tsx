import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';
import { useSelector } from '@/store/Store';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
// import Router from './routes/Router';
import { AppState } from './store/Store';
import AppRouter from './router/AppRouter';
import { CustomConfirmDialog } from './shared/components';
import { CustomBackdropLoader } from './shared/components/Loaders';
import { SocketProvider } from './context/SocketContext';

const queryClient = new QueryClient();

function App() {
  const routing = useRoutes(AppRouter);
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            {/* ----- modal ----- */}
            <CustomConfirmDialog />
            {/* ----- loader ----- */}
            <CustomBackdropLoader />

            {/* ----- Toaster alerts ----- */}
            {/* <ToastContainer
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
            /> */}
            <ScrollToTop>{routing}</ScrollToTop>
          </RTL>
        </ThemeProvider>
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default App;
