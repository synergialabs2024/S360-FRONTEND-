import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CategoriasProductoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CategoriaProducto;
}

export interface CategoriaProducto {
  id?: number;
  uuid?: string;

  nombre: string;
  state: boolean;

  created_at?: string;
  modified_at?: string;
}
