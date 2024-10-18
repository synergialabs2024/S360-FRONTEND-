import { UserRolesEnumChoice } from '@/shared/constants/app';

export interface UserProfilesAndUsersPaginatedRes {
  count: number;
  next: string;
  previous: string;
  data: UserProfile[];
}

export interface UserProfile {
  id?: number;
  uuid?: string;

  identificacion: string;
  tipo_identificacion: string;

  // auth
  intentos_fallidos: number;
  ip_login: null | string;
  os_login: null | string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  empresa?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  role?: UserRolesEnumChoice; // choice

  user?: number;
}

export interface UserProfileLimit {
  id?: number;
  uuid?: string;

  identificacion: string;
  tipo_identificacion: string;

  ///* fk
  empresa?: number;
  empresa_name?: string;
}
