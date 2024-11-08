import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLogin } from '@/actions/auth';
import { useForm } from 'react-hook-form';

import { loginFormSchema } from '@/shared/utils';
import { useAuthNoLSStore } from '@/store/auth';

import { CustomFormLabel } from '@/shared/components';
import { loginType } from '@/types/auth/auth';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

// import AuthSocialButtons from './AuthSocialButtons';

type LoginFormData = {
  username: string;
  password: string;
  // empresa: string;
};

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
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

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* <AuthSocialButtons title="Sign in with" /> */}
      <Box mt={3}>
        <Divider>
          {/* <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography> */}
        </Divider>
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">
              Nombre de usuario
            </CustomFormLabel>
            <TextField
              id="username"
              variant="outlined"
              autoComplete="username"
              fullWidth
              required
              autoFocus
              InputProps={{
                style: { color: 'black' },
              }}
              {...register('username')}
              error={!!usernameForm.formState.errors.username}
              helperText={usernameForm.formState.errors.username?.message}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <TextField
              id="password"
              variant="outlined"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              InputProps={{
                style: { color: 'black' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'blue' }}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
              error={!!usernameForm.formState.errors.password}
              helperText={usernameForm.formState.errors.password?.message}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            {/* <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Olvidaste tu contraseña?
            </Typography> */}
          </Stack>
        </Stack>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          disabled={loginMutation.isPending || isBlocked}
        >
          Iniciar sesión
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
