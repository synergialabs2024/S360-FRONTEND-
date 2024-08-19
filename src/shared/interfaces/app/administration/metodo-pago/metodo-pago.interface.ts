import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MetodoPagosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MetodoPago[];
}

export interface MetodoPago {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  name: string;
  state: boolean;
  description: string;
}

export type MetodoPagoLimitData = Pick<MetodoPago, 'name' | 'uuid'>;
