import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PrioridadIncidenciaTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PrioridadIncidenciaTM[];
}

export interface PrioridadIncidenciaTM {
  id?: number;
  uuid?: string;

  name: string;
  code: string;
  state: boolean;
  color_hex: string;
  user_create: string;

  created_at?: string;
  modified_at?: string;
}

export type PrioridadIncidenciaTMLimitData = Pick<
  PrioridadIncidenciaTM,
  'id' | 'uuid'
>;
