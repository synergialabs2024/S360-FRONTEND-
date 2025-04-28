import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Producto } from '../producto.interface';

export interface IngresoMaterialesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: IngresoMaterial[];
}

export interface IngresoMaterial {
  id?: number;
  uuid?: string;
  secuencial?: string;

  state: boolean;
  observacion: string;
  productos: Producto[];

  producto?: number;

  ///* fk
  bodega: number;
  ubicacion: number;
  motivo_ingreso: number;
  user_create: number;

  created_at?: string;
  modified_at?: string;
}

export type IngresoMaterialLimitData = Pick<
  IngresoMaterial,
  'uuid' | 'id' | 'secuencial'
>;
