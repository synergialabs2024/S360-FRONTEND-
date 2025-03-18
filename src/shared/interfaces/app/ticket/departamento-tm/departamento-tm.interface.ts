import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface DepartamentoTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: DepartamentoTM[];
}

export interface DepartamentoTM {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  code: string;

  created_at?: string;
  modified_at?: string;
}

export type DepartamentoTMLimitData = Pick<DepartamentoTM, 'id' | 'uuid'>;
