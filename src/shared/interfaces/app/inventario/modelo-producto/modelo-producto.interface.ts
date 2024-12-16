import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ModelosProductoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ModeloProducto[];
}

export interface ModeloProducto {
  uuid?: string;
  id?: number;

  nombre: string;
  codigo: string;

  created_at?: string;
  modified_at?: string;
}
