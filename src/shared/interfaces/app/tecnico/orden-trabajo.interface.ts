import {
  Agendamiento,
  FlotaLimitData,
  LineaServicio,
  Preventa,
  SolicitudServicio,
} from '@/shared';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface OrdenesTrabajoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: OrdenTrabajo[];
}

export interface OrdenTrabajo {
  id?: number;
  uuid?: string;
  estado_orden_trabajo: string; // choice
  tipo_orden_trabajo: string; // choice

  numero_referencia?: string;
  codigo?: string;

  hora_inicio: string; // timestamp
  hora_fin: string; // timestamp

  // INVENTARIO -------------------
  materiales_utilizados: string;
  equipos_utilizados: string;

  punta_inicial_fibra: string;
  punta_final_fibra: string;
  metraje_utilizado_fibra: string;
  metraje_exedente_fibra: string;
  serie_ont: string;
  potencia_ont: string;

  url_foto_ont: string;
  url_foto_potencia_ont: string;
  url_foto_ont_encontrado_casa: string;
  url_foto_etiqueta: string;
  url_foto_nap: string;
  url_foto_potencia_nap: string;
  url_foto_premio: string;
  url_foto_test_speed: string;
  url_foto_acta_entrega_ups: string;

  // ACTIVACION -------------------
  estado_activacion: string;
  ipv4: string;
  ipv6: string;
  pppoe: string;
  pppassword: string;

  observacion_prerechazo: string;

  ///* fk
  flota?: number;
  usuario_flota?: number; // gestiona - user de flota

  motivo_prerechazo?: number;

  linea_servicio?: number; // cliente
  solicitud_servicio?: number;
  preventa?: number;
  agendamiento?: number;

  nodo?: number;
  olt?: number;
  router?: number;
  pool_ipv4?: number;
  pool_ipv6?: number;

  // sales filters
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  solicitud_servicio_data?: SolicitudServicio;
  preventa_data?: Preventa;
  agendamiento_data?: Agendamiento;
  flota_data?: FlotaLimitData;
  linea_servicio_data?: LineaServicio;
}
