import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface OrigenesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Origen[];
}

export interface Origen {
  id?: number;
  uuid?: number;
  name: string;
  state: boolean;
}
