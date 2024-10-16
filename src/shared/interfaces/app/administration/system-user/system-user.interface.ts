import { UserRolesEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Empleado } from '../../nomina';
import { CanalVenta } from '../canal-venta';

export interface SystemUsersPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SystemUserItem[];
}

export interface SystemUserItem {
  user: SystemUser;
  create_employee?: boolean; // only serializer
  employee?: Empleado; // only serializer
}

export interface SystemUser {
  id?: number;
  uuid?: string;
  username: string;
  email: string;

  razon_social?: string;
  tipo_identificacion: string; // choice
  identificacion: string;

  ///* fk
  groups: number[];
  area?: number;
  departamento?: number;
  canal_venta?: number;
  role?: UserRolesEnumChoice; // choice
}

export type SystemUserLimitData = Pick<
  SystemUser,
  'username' | 'email' | 'razon_social' | 'uuid' | 'id'
> & {
  canal_venta_data?: CanalVenta;
};
