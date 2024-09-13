import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface AgendamientosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Agendamiento;
}

export interface Agendamiento {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  estado_agendamiento: string;

  fecha_instalacion: string;
  hora_instalacion: string;
  distancia_nap: string;

  encuesta: EncuestaAgenda;
  usos: EncuestaAgenda;

  observaciones_vendedor: EncuestaAgenda;
  observacion_rechazo: string;

  numero_comprobante: string;
  url_foto_comprobante?: string;
  descripcion_pago: string;
  estado_pago: string;

  ///* fk
  linea_servicio?: number;
  solicitud_servicio?: number;
  preventa?: number;
  flota?: number;
  nap?: number;
  user_gestiona?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;
}

export type EncuestaAgenda = {};
