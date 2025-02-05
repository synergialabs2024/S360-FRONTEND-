import { PagingMetaResponse } from '@/shared/interfaces/common';
import { UbicacionProducto } from '../ubicacion-producto.interface';

export interface EgresoMaterialesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: EgresoMaterial[];
}

export interface EgresoMaterial {
  id?: number;
  uuid?: string;
  state: boolean;

  observacion: string;
  productos: UbicacionProducto[];

  ///* fk
  bodega: number;
  ubicacion: number;
  motivo_egreso: number;

  created_at?: string;
  modified_at?: string;
}

export type EgresoMaterialLimitData = Pick<EgresoMaterial, 'uuid' | 'id'>;
