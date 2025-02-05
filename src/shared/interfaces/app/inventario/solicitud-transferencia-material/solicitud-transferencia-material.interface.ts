import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Bodega, Producto, Ubicacion } from '../../inventario';

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
  productos: Producto[];

  //* fk
  bodega_origen: number;
  ubicacion_origen: number;
  bodega_destino: number;
  ubicacion_destino: number;

  bodega_origen_data?: Bodega;
  bodega_destino_data?: Bodega;
  ubicacion_destino_data?: Ubicacion;
  ubicacion_origen_data?: Ubicacion;

  created_at?: string;
  modified_at?: string;
}

export type SolicitudTransferenciaMaterialLimitData = Pick<
  SolicitudTransferenciaMaterial,
  'uuid' | 'id'
>;
