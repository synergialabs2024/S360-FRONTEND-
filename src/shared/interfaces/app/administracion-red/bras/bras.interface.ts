import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface BrasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Bras[];
}

export interface Bras {
  id?: string;
  uuid?: string;

  name?: string;
}

export type BrasLimitData = Pick<Bras, 'id' | 'uuid'>;
