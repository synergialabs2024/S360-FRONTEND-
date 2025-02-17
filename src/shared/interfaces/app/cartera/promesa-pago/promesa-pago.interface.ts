import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PromesaPagoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PromesaPago[];
}

export interface PromesaPago {
  id?: number;
  uuid?: string;

  estado_promesa: string;
  estado_linea_al_registrar: string;
  calificacion_contrato: string;
  fecha_promesa_pago: string;
  observacion: string;
  monto_pagado: string;
  fecha_pago_efectivo: string;
  comprobante_cobro: string;
  canal_pago: string;
  pago_a_tiempo: boolean;
  responsable_registro: number;
  cliente: number;
  contrato: number;
  linea_servicio: number;

  created_at?: string;
  modified_at?: string;
}
