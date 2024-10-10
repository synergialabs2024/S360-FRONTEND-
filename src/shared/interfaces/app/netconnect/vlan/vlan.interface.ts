import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface VlansPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Vlan[];
}

export interface Vlan {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type VlanLimitData = Pick<Vlan, 'uuid' | 'name'>;
