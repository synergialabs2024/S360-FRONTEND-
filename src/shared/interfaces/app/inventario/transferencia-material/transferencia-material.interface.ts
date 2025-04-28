import { PagingMetaResponse } from '@/shared/interfaces/common';
//import { Producto } from '../producto.interface';
import { Bodega } from '../bodega';
import { Ubicacion } from '../ubicacion.interface';
import { Producto } from '../producto.interface';

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
  productos: Producto[];

  ///* fk
  bodega_origen?: number;
  ubicacion_origen?: number;
  bodega_destino?: number;
  ubicacion_destino?: number;
  motivo_transferencia?: number;
  user_create?: number;

  //producto_data?: Producto;
  bodega_origen_data?: Bodega;
  bodega_destino_data?: Bodega;
  ubicacion_destino_data?: Ubicacion;
  ubicacion_origen_data?: Ubicacion;

  //* solicitudes
  data?: string[];
  bodega?: number;
  ubicacion?: number;
  ubicacion_data?: string[];

  created_at?: string;
  modified_at?: string;
}

export type TransferenciaMaterialLimitData = Pick<
  TransferenciaMaterial,
  'uuid' | 'id'
>;
