import { create } from 'zustand';

import { LoginData } from '@/actions/auth';
import { Nullable } from '@/shared/interfaces';

////* AuthNoLSStore ---------------------
export interface AuthNoLSStore {
  failedLoginAttempts: number;
  isBlocked: boolean;
  loginData: Nullable<LoginData>;

  setFailedLoginAttempts: (attempts: number) => void;
  setIsBlocked: (isBlocked: boolean) => void;
  setLoginData: (data: Nullable<LoginData>) => void;
}

export const useAuthNoLSStore = create<AuthNoLSStore>(set => ({
  failedLoginAttempts: 0,
  isBlocked: false,
  loginData: null,

  setFailedLoginAttempts: attempts => {
    set({ failedLoginAttempts: attempts });
  },

  setIsBlocked: isBlocked => {
    set({ isBlocked });
  },

  setLoginData: data => {
    set({ loginData: data });
  },
}));
