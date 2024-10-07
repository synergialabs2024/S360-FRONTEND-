import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Bodega } from './bodega';
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

  series: SerieProducto[];

  created_at?: string;
  modified_at?: string;

  ///* fk
  bodega: number;
  ubicacion: number;
  producto: number;

  bodega_data: Bodega;
  producto_data: Producto;
  ubicacion_data: Ubicacion;
}

export interface SerieProducto {
  code: string;
  block_until?: string; // timestamp
}
