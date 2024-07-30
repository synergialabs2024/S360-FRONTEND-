import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

export interface AuthLayoutInterface {}

const AuthLayout: React.FC<AuthLayoutInterface> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121621',
      }}
    >
      <Paper
        component="main"
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '90%',
          maxWidth: '1200px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#1f2937',
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
