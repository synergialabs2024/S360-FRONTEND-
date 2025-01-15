import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Producto } from '../producto.interface';

export interface SolicitudMaterialPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudMaterial[];
}

export interface SolicitudMaterial {
  id?: number;
  uuid?: string;
  state: boolean;
  estado_solicitud?: string;
  observacion: string;
  productos: Producto[];
  bodega: number;
  ubicacion: number;

  created_at?: string;
  modified_at?: string;
}

export type BodegaLimitData = Pick<SolicitudMaterial, 'uuid' | 'bodega' | 'id'>;
