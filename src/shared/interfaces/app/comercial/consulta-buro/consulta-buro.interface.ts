import {
  AreaLimitData,
  CanalVentaLimitData,
  DepartamentoLimitData,
  SolicitudServicioLimitData,
  SystemUserLimitData,
} from '@/shared';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ConsultasBuroPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ConsultaBuro[];
}

export interface ConsultaBuro {
  id?: number;
  uuid?: string;

  created_at: string;
  modified_at: string;

  identificacion: string;
  tipo_identificacion: string;
  excedida: boolean; // monthly quota - canal_venta per user
  consulta_externa: boolean; // not cached or own db microservice

  ///* fk
  solicitud_servicio?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  vendedor_data?: SystemUserLimitData;
  area_data?: AreaLimitData;
  departamento_data?: DepartamentoLimitData;
  canal_venta_data?: CanalVentaLimitData;
  solicitud_servicio_data?: SolicitudServicioLimitData;
}
