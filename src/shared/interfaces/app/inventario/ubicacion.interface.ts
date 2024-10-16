import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Bodega } from './bodega';

export interface UbicacionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Ubicacion[];
}

export interface Ubicacion {
  id?: number;
  uuid?: string;

  nombre: string;
  state: boolean;

  created_at?: string;
  modified_at?: string;

  ///* fk
  bodega?: number;

  bodega_data?: Bodega;
}
