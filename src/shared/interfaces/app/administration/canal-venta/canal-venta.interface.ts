import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CanalVentasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CanalVenta[];
}

export interface CanalVenta {
  id?: number;
  uuid?: string;
  name: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  empresa: number;
}

export type CanalVentaLimitData = Pick<CanalVenta, 'uuid' | 'name'>;
