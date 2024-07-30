import { UserProfile } from '@/shared/interfaces/auth';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Empleado } from '../../nomina';

export interface SystemUsersPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SystemUserItem[];
}

export interface SystemUserItem {
  user: SystemUser;
  profile: UserProfile;
  create_employee?: boolean; // only serializer
  employee?: Empleado; // only serializer
}

export interface SystemUser {
  id?: number;
  uuid?: string;
  username: string;
  email: string;

  // name: string;
  // last_name: string;

  razon_social?: string;

  groups: number[];
}
