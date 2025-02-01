import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ModelosInventarioPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ModeloInventario[];
}

export interface ModeloInventario {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;

  created_at?: string;
  modified_at?: string;
}
