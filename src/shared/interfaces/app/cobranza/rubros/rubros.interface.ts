import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface Rubros {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Rubro[];
}

export interface Rubro {
  id: number;
  uuid: string;
  created_at: Date;
  modified_at: Date;
  // tipo_rubro: TipoRubro;
  // estado_rubro: EstadoRubro;
  concepto: string;
  subtotal: string;
  valor_taxes: string;
  valor_total: string;
  valor_ice: string;
  valor_pagado: string;
  fecha_pago: Date;
  fecha_emision: Date;
  fecha_vencimiento: Date;
  // detalle: Detalle[];

  ///* fk
  cliente: number;
  linea_servicio: number;
  contrato: number;
}
