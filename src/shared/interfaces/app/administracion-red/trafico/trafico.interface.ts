import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TraficosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Trafico[];
}

export interface Trafico {
  id?: number;
  username: string;
}

export type TraficoLimitData = Pick<Trafico, 'id' | 'username'>;
