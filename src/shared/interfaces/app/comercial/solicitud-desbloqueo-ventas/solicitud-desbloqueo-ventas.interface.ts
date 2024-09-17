import {
  GeneralModelStatesEnumChoice,
  SalesModelsEnumChoice,
  SalesStatesActionsEnumChoice,
  SolicitudDesbloqueoTypeEnumChoice,
} from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUserLimitData } from '../../administration';
import { SolicitudServicioLimitData } from '../solicitud-servicio';

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
  state: boolean;

  motivo?: string;
  tipo?: SolicitudDesbloqueoTypeEnumChoice;

  // model related
  modelo: SalesModelsEnumChoice; // choice
  modelo_id: number;
  modelo_estado: SalesStatesActionsEnumChoice; // choice

  created_at?: string;
  modified_at?: string;

  ///* fk ------
  // controlled by backend
  area?: number; // admin area desbloqua (comercial)
  departamento?: number;
  canal_venta?: number;
  vendedor?: number; // user token

  vendedor_data?: SystemUserLimitData;
  gestionado_by_data?: SystemUserLimitData;
  modelo_data?: SolicitudServicioLimitData;
}

export interface Meta {
  next: null;
  previous: null;
  count: number;
  total_pages: number;
}
