import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface AutenticacionClientesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: AutenticacionCliente[];
}

export interface AutenticacionCliente {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type AutenticacionClienteLimitData = Pick<
  AutenticacionCliente,
  'uuid' | 'name'
>;
