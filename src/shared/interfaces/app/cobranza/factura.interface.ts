import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface FacturasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Factura[];
}

export interface Factura {
  id?: number;
  uuid?: string;

  fecha_emision: string;

  url_pdf: string;
  url_xml: string;
  xml: string;

  total: string;
  clave_acceso: string;
  numero: string;

  created_at?: string;
  modified_at?: string;
}
