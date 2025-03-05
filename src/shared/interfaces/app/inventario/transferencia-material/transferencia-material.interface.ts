import { PagingMetaResponse } from '@/shared/interfaces/common';
import { UbicacionProducto } from '../ubicacion-producto.interface';
import { Producto } from '../producto.interface';
import { Bodega } from '../bodega';
import { Ubicacion } from '../ubicacion.interface';

export interface TransferenciaMaterialesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: TransferenciaMaterial[];
}

export interface TransferenciaMaterial {
  id?: number;
  uuid?: string;
  state: boolean;

  observacion: string;
  productos: UbicacionProducto[];

  ///* fk
  producto: number;
  bodega_origen: number;
  ubicacion_origen: number;
  bodega_destino: number;
  ubicacion_destino: number;
  motivo_transferencia?: number;
  user_create: number;

  producto_data?: Producto;
  bodega_origen_data?: Bodega;
  bodega_destino_data?: Bodega;
  ubicacion_destino_data?: Ubicacion;
  ubicacion_origen_data?: Ubicacion;

  created_at?: string;
  modified_at?: string;
}

export type TransferenciaMaterialLimitData = Pick<
  TransferenciaMaterial,
  'uuid' | 'id'
>;
