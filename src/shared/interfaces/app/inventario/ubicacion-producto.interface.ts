import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Bodega } from './bodega';
import { ModeloProducto } from './modelo-producto/modelo-producto.interface';
import { Producto } from './producto.interface';
import { Ubicacion } from './ubicacion.interface';

export interface UbicacionProductoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: UbicacionProducto[];
}

export interface UbicacionProducto {
  id?: number;
  uuid?: string;
  state: boolean;

  stock_minimo: number;
  stock_maximo: number;
  stock_critico: number;
  stock_actual: number;

  series: UbicacionSerieProducto[];
  series_temporal: UbicacionSerieProducto[];

  created_at?: string;
  modified_at?: string;

  ///* fk
  bodega?: number;
  ubicacion?: number;
  producto?: number;

  bodega_data?: Bodega;
  producto_data?: Producto;
  ubicacion_data?: Ubicacion;
  modelo_data?: ModeloProducto;
}

// export interface UbicacionSerieProducto {
//   code: string;
//   block_until?: string; // timestamp
// }
export type UbicacionSerieProducto = string;

export type UbicacionProductoSeriesTypeStr = string;

export interface UbicacionProductoSeriesType {
  code: string;
}
