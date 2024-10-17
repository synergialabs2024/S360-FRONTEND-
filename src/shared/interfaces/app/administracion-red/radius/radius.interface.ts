import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface RadiusSPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Radius[];
}

export interface Radius {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type RadiuLimitData = Pick<Radius, 'uuid' | 'name'>;
