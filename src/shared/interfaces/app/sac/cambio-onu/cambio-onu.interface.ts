import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CambioOnuPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CambioOnu[];
}

export interface CambioOnu {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;

  permanencia: number;
  facturas_pagadas: number;
  estado_cambio_onu_negociacion: string;
  descuento: string;
  cuotas: number;
  comentario_negociacion: string;
  fecha_hora_cambio_onu_inicia: string;
  fecha_hora_cambio_onu_finaliza: string;
  estado_cambio_onu_activacion: string;
  serie_onu_actual: string;
  serie_onu_nueva: string;
  comentario_activacion: string;
  fecha_hora_activacion_inicia: string;
  fecha_hora_activacion_finaliza: string;
  usuario_negociacion_inicia: number;
  usuario_negociacion_finaliza: number;
  usuario_activacion: number;
  linea_servicio: number;
  user_create: number;
  user_update: number;
}
