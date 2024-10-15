import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { logOutAxios } from '@/actions/auth';
import { Nullable, UserLoginResponse } from '@/shared/interfaces';
import { ToastWrapper } from '@/shared/wrappers';
import { useUiStore } from '../ui';

export type UserLoginResponseType = UserLoginResponse;
interface AuthState {
  token: string | null;
  isAuth: boolean;
  user: Nullable<UserLoginResponseType>;
  isLoading: boolean;

  setToken: (token: string | null) => void;
  setIsAuth: (isAuth: boolean) => void;
  setAuth: (token: string, user: Nullable<UserLoginResponseType>) => void;

  onLogout: () => void;
  onLogOutWithoutToken: () => void;

  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      isAuth: false,
      user: null,
      userProfile: null,
      isLoading: false,

      setToken: token => set({ token }),
      setIsAuth: isAuth => set({ isAuth }),

      setAuth: (token, user) => {
        set({ token, user, isAuth: !!token && !!user?.uuid });
      },

      onLogout: async (showAlert = true) => {
        const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

        ///* logout request
        setIsGlobalLoading(true);
        const res = await logOutAxios();
        setIsGlobalLoading(false);

        showAlert && ToastWrapper.success(res.message);

        set({ token: '', user: null, isAuth: false });
        localStorage.clear();
      },

      onLogOutWithoutToken: () => {
        set({ token: '', user: null, isAuth: false });
        localStorage.clear();
      },

      setIsLoading: isLoading => set({ isLoading }),
    }),

    {
      name: 'auth-store',
    },
  ),
);
