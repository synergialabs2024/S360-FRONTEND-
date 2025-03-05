import { PagingMetaResponse } from '@/shared/interfaces/common';
import { IngresoMaterial } from '../ingreso-material';

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
  productos: IngresoMaterial[];

  //* fk
  bodega: number;
  ubicacion: number;
  ingreso_material: number;
  user_create: number;

  created_at?: string;
  modified_at?: string;
}

export type SolicitudDevolucionLimitData = Pick<
  SolicitudDevolucion,
  'uuid' | 'bodega' | 'id'
>;
