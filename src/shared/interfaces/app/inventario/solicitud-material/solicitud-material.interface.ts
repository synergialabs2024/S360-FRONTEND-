import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Ubicacion } from '../ubicacion.interface';
import { Bodega } from '../bodega';
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
  estado_solicitud?: string;

  state: boolean;
  observacion: string;
  productos: Producto[];

  ///* fk
  bodega: number;
  ubicacion: number;
  user_create: number;

  bodega_data?: Bodega;
  ubicacion_data?: Ubicacion;

  //* solicitudes
  data?: string[];
  bodega_origen?: Bodega;
  ubicacion_origen?: Ubicacion;
  bodega_destino?: Bodega;
  ubicacion_destino?: Ubicacion;
  ubicacion_origen_data?: string[];

  created_at?: string;
  modified_at?: string;
}

export type SolicitudMaterialLimitData = Pick<
  SolicitudMaterial,
  'uuid' | 'bodega' | 'id'
>;
