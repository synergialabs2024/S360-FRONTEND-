import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface BodegasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Bodega[];
}

export interface Bodega {
  id?: number;
  uuid?: string;
  state: boolean;

  nombre: string;
  direccion: string;
  es_externa: boolean;
  centro_costo: number;

  created_at?: string;
  modified_at?: string;
}

export type BodegaLimitData = Pick<Bodega, 'uuid' | 'nombre' | 'id'>;
