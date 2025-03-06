import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface AsuntosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Asunto[];
}

export interface Asunto {
  id?: number;
  uuid?: string;
  name: string;
  state: boolean;
  valor_cobrar: number;
  tipo_ticket: string;
}
