import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Bodega, Ubicacion } from '../../inventario';

export interface SolicitudTransferenciaMaterialPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudTransferenciaMaterial[];
}

export interface SolicitudTransferenciaMaterial {
  id?: number;
  uuid?: string;

  state: boolean;
  observacion: string;
  secuencial: string;
  estado_solicitud: string;
  productos: Productos[];

  //* fk
  bodega_origen: number;
  ubicacion_origen: number;
  bodega_destino: number;
  ubicacion_destino: number;
  user_create: number;

  bodega_origen_data?: Bodega;
  bodega_destino_data?: Bodega;
  ubicacion_destino_data?: Ubicacion;
  ubicacion_origen_data?: Ubicacion;

  //* solicitudes
  data?: string[];
  bodega?: number;
  ubicacion?: number;
  ubicacion_data?: Ubicacion;

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

export type SolicitudTransferenciaMaterialLimitData = Pick<
  SolicitudTransferenciaMaterial,
  'uuid' | 'id'
>;
