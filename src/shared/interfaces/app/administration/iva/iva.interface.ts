import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface IVAPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: IVA[];
}

export interface IVA {
  id?: number;
  uuid?: string;
  state: boolean;

  name: string;
  sri_code: string;
  percentage: string;

  iva_defecto: boolean;

  created_at?: string;
  modified_at?: string;
}
