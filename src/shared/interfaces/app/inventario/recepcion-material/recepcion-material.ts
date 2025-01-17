import { PagingMetaResponse } from '@/shared/interfaces/common';
import { UbicacionProducto } from '../ubicacion-producto.interface';
import { Bodega } from '../bodega';
import { Ubicacion } from '../ubicacion.interface';

export interface RecepcionMaterialesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: RecepcionMaterial[];
}

export interface RecepcionMaterial {
  id?: number;
  uuid?: string;
  state: boolean;

  observacion: string;
  productos: UbicacionProducto[];
  estado_solicitud: string;

  ///* fk
  bodega: number;
  ubicacion: number;

  bodega_data: Bodega;
  ubicacion_data: Ubicacion;

  created_at?: string;
  modified_at?: string;
}

export type RecepcionMaterialLimitData = Pick<RecepcionMaterial, 'uuid' | 'id'>;
