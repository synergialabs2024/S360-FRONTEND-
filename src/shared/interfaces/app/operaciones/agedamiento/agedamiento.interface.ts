import { EstadoLlamadaEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUserLimitData } from '../../administration';
import { Preventa, SolicitudServicio } from '../../comercial';

export interface AgendamientosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Agendamiento;
}

export interface Agendamiento {
  id?: number;
  uuid?: string;

  numero_referencia: string;
  codigo: string;

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

  // pyl --------
  estado_llamada: EstadoLlamadaEnumChoice;
  observacion_llamada: string;
  user_gestiona?: number;

  ///* fk
  linea_servicio?: number;
  solicitud_servicio?: number;
  preventa?: number;
  flota?: number;
  nap?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  solicitud_servicio_data?: SolicitudServicio;
  preventa_data?: Preventa;
  vendedor_data?: SystemUserLimitData;
}

export type EncuestaAgenda = {};
