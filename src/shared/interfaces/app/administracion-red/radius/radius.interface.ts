import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface RadiusSPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Radius[];
}

export interface Radius {
  id?: number;

  username: string;
  ip_address: string;
  ppp_pass: string;
  olt_name: string;
}

export type RadiuLimitData = Pick<Radius, 'id' | 'username'>;
