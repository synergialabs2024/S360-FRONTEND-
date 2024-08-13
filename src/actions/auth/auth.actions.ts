import { ToastWrapper } from '@/shared/wrappers';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  HTTPResStatusCodeEnum,
  LOGIN_ERRORS,
  LoginResponse,
} from '@/shared/interfaces';
import {
  useAuthNoLSStore,
  useAuthStore,
  useUserModulesStore,
  useUserPermissionsStore,
} from '@/store/auth';
import { useUiConfirmModalStore, useUiStore } from '@/store/ui';

const { post, get } = erpAPI();

export type LoginData = {
  username: string;
  password: string;
  force_login?: boolean;
  empresa?: string;
};

export const useLogin = () => {
  ///* global state
  const setAuth = useAuthStore(s => s.setAuth);
  const logOutWithoutToken = useAuthStore(s => s.onLogOutWithoutToken);
  const setLoginData = useAuthNoLSStore(s => s.setLoginData);
  const setModulos = useUserModulesStore(s => s.setModules);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  const setPermissions = useUserPermissionsStore.getState().setPermissions;

  return useMutation({
    mutationKey: ['login'],

    mutationFn: (data: LoginData) => {
      setLoginData(data);
      return login(data);
    },

    onSuccess: async res => {
      const { loginResponse } = res;

      setAuth(loginResponse.token, loginResponse?.user || null);
      setPermissions(loginResponse?.user?.permissions || []);
      setModulos(loginResponse?.system_modules || []);

      ToastWrapper.success('Inicio de sesión exitoso');
    },

    onError: err => {
      if (isAxiosError(err)) {
        // // // User blocked --------------
        if (err.response?.status === HTTPResStatusCodeEnum.USER_BLOCKED) {
          useAuthNoLSStore.getState().setIsBlocked(true);
          ToastWrapper.error(
            'Has excedido el número de intentos fallidos permitidos, tu usuario ha sido bloqueado.',
          );
          return;
        }

        // // // Wrong username --------------
        if (err.response?.status === HTTPResStatusCodeEnum.BAD_REQUEST) {
          ToastWrapper.error('Creedenciales incorrectas');
          return;
        }

        // // // Wrong password --------------
        const attempt = err.response?.data?.data?.failed_attempts;
        const isWrongPasswordResponse = isFinite(attempt);
        if (isWrongPasswordResponse) {
          if (attempt >= LOGIN_ERRORS.wrongPassword.allowedAttempts) {
            useAuthNoLSStore.getState().setIsBlocked(true);
            ToastWrapper.error(
              'Has excedido el número de intentos fallidos permitidos, tu usuario ha sido bloqueado.',
            );
            return;
          }

          if (attempt === LOGIN_ERRORS.wrongPassword.showMsgAttempt) {
            setConfirmDialog({
              isOpen: true,
              title: 'Te queda un intento',
              subtitle:
                'Si fallas en el siguiente intento, tu usuario será bloqueado y deberás contactar a soporte técnico para desbloquearlo',
              cancelTextBtn: 'Cerrar',
              confirmTextBtn: 'Entendido',
              onConfirm: () => {
                setConfirmDialogIsOpen(false);
              },
            });
            return;
          }
        }

        // // // Session is active --------------
        if (
          err.response?.status ===
          HTTPResStatusCodeEnum.CONFLICTS_OR_ACTIVE_SESSION
        ) {
          const loginData = useAuthNoLSStore.getState().loginData;
          setConfirmDialog({
            isOpen: true,
            // title: `Este usuario ya tiene una sesión activa
            // en la dirección IP: ${err.response?.data?.data?.ip}`,
            title:
              err.response?.data?.message ||
              'Este usuario ya tiene una sesión activa',
            subtitle:
              '¿Desea cerrar la sesión activa y continuar con la nueva sesión?',
            onConfirm: async () => {
              try {
                const { loginResponse } = await login({
                  username: loginData?.username ?? '',
                  password: loginData?.password ?? '',
                  force_login: true,
                  empresa: loginData?.empresa ?? '',
                });
                setAuth(loginResponse.token, loginResponse.user || null);
                setPermissions(loginResponse.user?.permissions || []);
                setModulos(loginResponse?.system_modules || []);

                ToastWrapper.success('Inicio de sesión exitoso');
              } catch (error) {
                handleAxiosError(error);
              } finally {
                setConfirmDialogIsOpen(false);
                setIsGlobalLoading(false);
              }
            },
          });
        }

        ToastWrapper.error(
          err.response?.data?.message || 'Error al iniciar sesión',
        );
        logOutWithoutToken();
      }
      logOutWithoutToken();
    },

    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const login = async (data: LoginData) => {
  const setAuthToken = useAuthStore.getState().setToken;
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  setIsGlobalLoading(true);
  const loginRes = await post<LoginResponse>(
    '/auth/login/',
    {
      username: data.username,
      password: data.password,
      ...(data.force_login && { force_login: data.force_login }),
      empresa: data.empresa,
    },
    false,
  );

  const { token } = loginRes?.data ?? {};
  setAuthToken(token); // to get permissions

  setIsGlobalLoading(false);

  return {
    loginResponse: loginRes.data,
  };
};

export const logOutAxios = async () => {
  return post('/auth/logout/', null, true);
};

export const unBlockUserInvalidPassword = async (id: number) => {
  try {
    return await get(`/desbloquear-usuario/${id}/`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

// export const getUserPermissions = async (): Promise<PermissionsResponse> => {
//   const { data } = await get<PermissionsResponse>('/mis-permisos/', true);

//   return data;
// };
