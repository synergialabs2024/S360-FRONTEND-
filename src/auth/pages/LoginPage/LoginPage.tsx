import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { IoMdUnlock } from 'react-icons/io';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { useLogin } from '@/actions/auth';
import { loginFormSchema } from '@/shared/utils';
import { useAuthNoLSStore } from '@/store/auth';

type LoginFormData = {
  username: string;
  password: string;
  // empresa: string;
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isBlocked = useAuthNoLSStore(s => s.isBlocked);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  ///* mutations
  const loginMutation = useLogin();

  ///* form
  const usernameForm = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { isValid: isValidLoginData },
  } = usernameForm;

  ///* handlers
  const onSubmit = (data: LoginFormData) => {
    if (!isValidLoginData || isBlocked) return;
    console.log('data', data);

    loginMutation.mutate(data);
  };

  // useLoaders(isLoadingEmpresas || loginMutation.isPending);

  return (
    <>
      {/* ============ IMAGE ============ */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: '200px', md: 'auto' },
          backgroundImage: 'url("/login_01.png")',
          backgroundSize: 'cover',
          objectFit: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ============ FORM CONTAINER ============ */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1f2937',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: { xs: '100%', sm: '80%', md: '75%' },
            p: { xs: 3, sm: 4 },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <IoMdUnlock />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
            Login
          </Typography>
          <Typography
            component="h2"
            variant="body2"
            sx={{ color: '#9ca3af', mb: 2 }}
          >
            See your growth and get consulting support!
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FaGoogle />}
            sx={{ mt: 1, mb: 2, color: '#ffffff', borderColor: '#374151' }}
          >
            Sign in with Google
          </Button>

          <Box
            component="form"
            noValidate
            sx={{ mt: 1, width: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              autoComplete="username"
              autoFocus
              InputProps={{
                style: { color: 'white' },
              }}
              {...register('username')}
              error={!!usernameForm.formState.errors.username}
              helperText={usernameForm.formState.errors.username?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!usernameForm.formState.errors.password}
              helperText={usernameForm.formState.errors.password?.message}
              InputProps={{
                style: { color: 'white' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'white' }}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <CustomTextField
              label="Nombre de usuario"
              // errors
              name="username"
              control={usernameForm.control}
              overrideAsPassword
              defaultValue={usernameForm.getValues().username}
              error={usernameForm.formState.errors.username}
              helperText={usernameForm.formState.errors.username?.message}
              InputProps={{
                style: { color: 'white' },
              }}
              required={false}
            />
            <CustomPasswordTextField
              label="Password"
              control={usernameForm.control}
              name="password"
              errors={usernameForm.formState.errors}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loginMutation.isPending || isBlocked}
            >
              Login
            </Button>
          </Box>

          <Box mt={5}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ color: '#9ca3af' }}
            >
              ©{new Date().getFullYear()} All rights reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
