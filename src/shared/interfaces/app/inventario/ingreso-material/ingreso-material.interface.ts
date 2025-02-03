import { PagingMetaResponse } from '@/shared/interfaces/common';
import { UbicacionProducto } from '../ubicacion-producto.interface';

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
  productos: UbicacionProducto[];

  ///* fk
  bodega: number;
  ubicacion: number;

  created_at?: string;
  modified_at?: string;
}

export interface IngresoMaterialSeries {
  series: string;
}

export type IngresoMaterialLimitData = Pick<
  IngresoMaterial,
  'uuid' | 'id' | 'secuencial'
>;
