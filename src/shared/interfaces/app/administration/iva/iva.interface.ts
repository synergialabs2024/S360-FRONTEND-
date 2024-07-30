import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface IVAPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: IVA;
}

export interface IVA {
  id?: number;
  uuid?: string;
  name: string;
  sri_code: string;
  percentage: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;
}
