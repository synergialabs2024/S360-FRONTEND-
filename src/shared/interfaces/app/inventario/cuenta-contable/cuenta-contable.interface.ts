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

  created_at?: string;
  modified_at?: string;
}

export type CuentaContableLimitData = Pick<
  CuentaContable,
  'uuid' | 'nombre' | 'id'
>;
