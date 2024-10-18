import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface autorizacionOnusPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: AutorizacionOnu[];
}

export interface AutorizacionOnu {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;

  created_at?: string;
  modified_at?: string;
}

export type AutorizacionOnusLimitData = Pick<AutorizacionOnu, 'uuid' | 'name'>;
