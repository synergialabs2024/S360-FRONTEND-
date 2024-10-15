import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TraficosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Trafico[];
}

export interface Trafico {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type TraficoLimitData = Pick<Trafico, 'uuid' | 'name'>;
