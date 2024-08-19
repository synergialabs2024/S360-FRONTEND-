import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface EntidadFinancierasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: EntidadFinanciera[];
}

export interface EntidadFinanciera {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  name: string;
  state: boolean;
  description: string;
}

export type EntidadFinancieraLimitData = Pick<
  EntidadFinanciera,
  'name' | 'uuid'
>;
