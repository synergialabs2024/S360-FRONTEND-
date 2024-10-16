import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CentroCostosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CentroCosto[];
}

export interface CentroCosto {
  id?: number;
  uuid?: string;
  state: boolean;

  name: string;
  codigo: string;

  created_at?: string;
  modified_at?: string;
}

export type CentroCostoLimitData = Pick<CentroCosto, 'uuid' | 'name'>;
