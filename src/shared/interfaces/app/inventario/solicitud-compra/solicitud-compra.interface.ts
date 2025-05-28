import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Ubicacion } from '../ubicacion.interface';
import { Bodega } from '../bodega';

export interface SolicitudCompraPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudCompra[];
}

export interface SolicitudCompra {
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

  bodega_data?: Bodega;
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

export type SolicitudCompraLimitData = Pick<
  SolicitudCompra,
  'uuid' | 'bodega' | 'id'
>;
