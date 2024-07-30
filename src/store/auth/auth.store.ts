import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { logOutAxios } from '@/actions/auth';
import {
  Nullable,
  UserLoginResponse,
  UserProfileLimit,
} from '@/shared/interfaces';
import { ToastWrapper } from '@/shared/wrappers';
import { useUiStore } from '../ui';

export type UserLoginResponseType = UserLoginResponse;
interface AuthState {
  token: string | null;
  isAuth: boolean;
  user: Nullable<UserLoginResponseType>;
  userProfile: Nullable<UserProfileLimit>;
  isLoading: boolean;

  setToken: (token: string | null) => void;
  setIsAuth: (isAuth: boolean) => void;
  setAuth: (
    token: string,
    user: Nullable<UserLoginResponseType>,
    userProfile: Nullable<UserProfileLimit>,
  ) => void;

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

      setAuth: (token, user, userProfile) => {
        set({ token, user, isAuth: !!token && !!user?.email, userProfile });
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
