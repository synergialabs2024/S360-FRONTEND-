import { UserRolesEnumChoice } from '@/shared/constants';

export interface LoginResponse {
  token: string;
  user: UserLoginResponse;
  system_modules?: string[];
  company_data?: CompanyLoginResponse;
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
  role?: UserRolesEnumChoice; // choice
  company_data?: CompanyLoginResponse; // build in login action
}

export interface CompanyLoginResponse {
  id?: number;
  uuid?: string;
  company_name: string;
  commercial_name: string;
  schema_name: string; // db
  logo_1_url?: string;
  logo_2_url?: string;
}
