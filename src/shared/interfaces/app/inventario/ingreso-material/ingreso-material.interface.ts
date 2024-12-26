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
  state: boolean;

  observacion: string;
  productos: Producto[];

  ///* fk
  bodega: number;
  ubicacion: number;

  created_at?: string;
  modified_at?: string;
}

export interface IngresoMaterialSeries {
  series: string;
}

export type IngresoMaterialLimitData = Pick<IngresoMaterial, 'uuid' | 'id'>;
