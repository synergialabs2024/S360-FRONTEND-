import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MonitoreosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Monitoreo[];
}

export interface Monitoreo {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type MonitoreoLimitData = Pick<Monitoreo, 'uuid' | 'name'>;
