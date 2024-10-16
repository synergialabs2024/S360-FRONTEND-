export interface LoginResponse {
  token: string;
  user: UserLoginResponse;
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
  profile_image_url?: string;

  ///* fk
  permissions: string[];
  groups: number[];

  area?: string;
  departamento?: string;
  canal_venta?: string;
  centro_costo?: number;
  role?: string; // choice
}
