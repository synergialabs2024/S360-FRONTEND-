import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface GestionOnusPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: GestionOnu[];
}

export interface GestionOnu {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type GestionOnuLimitData = Pick<GestionOnu, 'uuid' | 'name'>;
