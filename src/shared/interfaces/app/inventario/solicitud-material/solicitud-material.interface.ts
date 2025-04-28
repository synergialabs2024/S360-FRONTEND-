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
  secuencial?: string;

  state: boolean;
  observacion: string;
  productos: Producto[];
  estado_solicitud?: string;

  ///* fk
  bodega: number;
  ubicacion: number;
  user_create: number;

  //* solicitudes
  data?: string[];
  bodega_origen?: number;
  ubicacion_origen?: number;
  bodega_destino?: number;
  ubicacion_destino?: number;
  ubicacion_origen_data?: string[];

  created_at?: string;
  modified_at?: string;
}

export type SolicitudMaterialLimitData = Pick<
  SolicitudMaterial,
  'uuid' | 'bodega' | 'id'
>;
