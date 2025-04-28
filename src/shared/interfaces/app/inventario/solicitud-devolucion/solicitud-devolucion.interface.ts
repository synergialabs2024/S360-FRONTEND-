import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Ubicacion } from '../ubicacion.interface';

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
  productos: Productos[];

  //* fk
  bodega: number;
  ubicacion: number;
  ingreso_material: number;
  user_create: number;

  //* solicitudes
  data?: string[];
  bodega_origen?: number;
  ubicacion_origen?: number;
  bodega_destino?: number;
  ubicacion_destino?: number;
  ubicacion_origen_data?: string[];
  ubicacion_data?: Ubicacion;

  created_at?: string;
  modified_at?: string;
}

interface Productos {
  producto: number | undefined;
  stock_up?: number;
  requiere_series?: boolean;
  cantidad?: number;
  series?: any[];
  codigo?: string;
}

export type SolicitudDevolucionLimitData = Pick<
  SolicitudDevolucion,
  'uuid' | 'bodega' | 'id'
>;
