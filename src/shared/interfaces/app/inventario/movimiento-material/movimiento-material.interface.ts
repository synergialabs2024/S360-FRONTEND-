import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Producto } from '../producto.interface';
import { Bodega } from '../bodega';
import { Ubicacion } from '../ubicacion.interface';

export interface MovimientoMaterialesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MovimientoMaterial[];
}

export interface MovimientoMaterial {
  id?: number;
  uuid?: string;
  state: boolean;

  cantidad: number;
  series: string[];
  observacion: string;
  tipo_movimiento: string;

  ///* fk
  producto: number;
  bodega_origen: number;
  ubicacion_origen: number;
  bodega_destino: number;
  ubicacion_destino: number;

  producto_data?: Producto;
  bodega_origen_data?: Bodega;
  bodega_destino_data?: Bodega;
  ubicacion_destino_data?: Ubicacion;
  ubicacion_origen_data?: Ubicacion;

  created_at?: string;
  modified_at?: string;
}

export type MovimientoMaterialLimitData = Pick<
  MovimientoMaterial,
  'uuid' | 'id'
>;
