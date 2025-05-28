import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Ubicacion } from '../ubicacion.interface';
import { Producto } from '../producto.interface';
import { Bodega } from '../bodega';

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

  bodega_data: Bodega;
  ubicacion_data: Ubicacion;

  // solicitud
  estado_solicitud?: string;

  created_at?: string;
  modified_at?: string;
}

export type IngresoMaterialLimitData = Pick<
  IngresoMaterial,
  'uuid' | 'id' | 'secuencial'
>;
