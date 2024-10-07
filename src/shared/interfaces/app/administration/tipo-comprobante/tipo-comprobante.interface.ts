import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TipoComprobantesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: TipoComprobante[];
}

export interface TipoComprobante {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;
  codigo: string;

  created_at?: string;
  modified_at?: string;
}

export type TipoComprobanteLimitData = Pick<TipoComprobante, 'uuid' | 'name'>;
