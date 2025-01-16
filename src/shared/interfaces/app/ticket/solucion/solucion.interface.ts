import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface Soluciones {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  meta: PagingMetaResponse;
  items: string[];
}

export interface AsuntosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Asunto[];
}

export interface Asunto {
  data?: string[];
}
