import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CuentaContablePaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CuentaContable[];
}

export interface CuentaContable {
  id?: number;
  uuid?: string;
  estado: boolean;

  nombre: string;
  codigo: string;
  descripcion: string;

  cuenta_padre: number;

  cuentas_hijas_data?: string[];

  created_at?: string;
  modified_at?: string;
}

export interface CuentaContable_Producto {
  id: number;
  label: string;
  nombre: string;
  cuenta_padre: number;
  cuentas_hijas_data?: string[];
  cuenta_padre_data: null;

  codigo: string;
  descripcion: string;
  estado: boolean;
}

export type CuentaContableLimitData = Pick<
  CuentaContable,
  'uuid' | 'nombre' | 'id'
>;
