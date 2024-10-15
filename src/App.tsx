import { ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ThemeSettings } from './theme/Theme';
// import Router from './routes/Router';
import AppRouter from './router/AppRouter';

function App() {
  const routing = useRoutes(AppRouter);
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
  );
}

export default App;
