import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Ubicacion } from '../ubicacion.interface';
import { Bodega } from '../bodega';
import { Producto } from '../producto.interface';

export interface SolicitudDevolucionPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudDevolucion[];
}

export interface SolicitudDevolucion {
  id?: number;
  uuid?: string;
  secuencial?: string;
  estado_solicitud?: string;

  state: boolean;
  observacion: string;
  productos: Producto[];

  //* fk
  bodega: number;
  ubicacion: number;
  ingreso_material: number;
  user_create: number;

  bodega_data?: Bodega;
  ubicacion_data?: Ubicacion;

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

export type SolicitudDevolucionLimitData = Pick<
  SolicitudDevolucion,
  'uuid' | 'bodega' | 'id'
>;
