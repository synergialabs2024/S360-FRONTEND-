import { PagingMetaResponse } from '@/shared/interfaces/common';
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
  user_create: any;

  observacion: string;
  productos: Productos[];
  estado_solicitud: string;

  ///* fk
  bodega: number;
  ubicacion: number;

  bodega_data: Bodega;
  ubicacion_data: Ubicacion;

  created_at?: string;
  modified_at?: string;
}

interface Productos {
  producto: number | undefined;
  stock_up?: number;
  requiere_series?: boolean;
  cantidad: number;
  series: any[];
  codigo?: string;
}

export type RecepcionMaterialLimitData = Pick<RecepcionMaterial, 'uuid' | 'id'>;
