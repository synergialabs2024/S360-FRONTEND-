import { UserProfile } from './user-profile.interface';

export interface LoginResponse {
  token: string;
  id: number;
  user: UserLoginResponse;
  profile?: UserProfile;
  system_modules?: string[];
}

export const LOGIN_ERRORS = {
  wrongPassword: {
    allowedAttempts: 3,
    showMsgAttempt: 2,
  },
};

export interface UserLoginResponse {
  id?: number;
  uuid?: string;
  username: string;
  email: string;
  razon_social: string;

  ///* fk
  permissions: string[];
  groups: number[];
}
