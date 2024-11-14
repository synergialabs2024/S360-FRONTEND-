import { EstadoRubroEnumChoice, TipoRubroEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { ClienteLimitData, ContratoLimitData } from '../cliente';
import { Producto } from '../inventario';

export interface RubrosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Rubro[];
}

export interface Rubro {
  id?: number;
  uuid?: string;

  numero_referencia: string;
  numero_rubro: string;

  tipo_rubro: TipoRubroEnumChoice;
  estado_rubro: EstadoRubroEnumChoice;

  concepto: string;

  subtotal: string;
  valor_taxes: string;
  valor_total: string;
  valor_ice: string;
  valor_pagado: string;

  detalle: BaseRubroDetail[];

  fecha_pago: string;
  fecha_emision: string;
  fecha_vencimiento: string;

  created_at: string;
  modified_at: string;

  ///* fk
  cliente?: number;
  linea_servicio?: number;
  contrato?: number;

  cliente_data?: ClienteLimitData;
  contrato_data?: ContratoLimitData;
}

export type BaseRubroDetail = {
  codigo: string;
  precio: string;
  cantidad: string;

  producto_data?: BaseRubroDetailProductData;
};
export type BaseRubroDetailProductData = Pick<
  Producto,
  'id' | 'uuid' | 'nombre'
>;
