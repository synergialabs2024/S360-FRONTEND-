import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface onusConfiguradasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: OnusConfigurada[];
}

export interface OnusConfigurada {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type OnusConfiguradasLimitData = Pick<OnusConfigurada, 'uuid' | 'name'>;
