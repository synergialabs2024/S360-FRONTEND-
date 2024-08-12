import {
  GeneralModelStatesEnumChoice,
  SalesModelsEnumChoice,
} from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SolicitudDesbloqueoVentasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudDesbloqueoVentas;
}

export interface SolicitudDesbloqueoVentas {
  id?: number;
  uuid?: string;

  solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice; // choice

  // model related
  modelo: SalesModelsEnumChoice; // choice
  modelo_id: number;
  modelo_estado: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  area?: number; // admin area desbloqua (comercial)
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;
}

export interface Meta {
  next: null;
  previous: null;
  count: number;
  total_pages: number;
}
