import { EstadoRubroEnumChoice, TipoRubroEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { ClienteLimitData, ContratoLimitData } from '../cliente';
import { Producto } from '../inventario';
import { Factura } from './factura.interface';

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
  factura_data?: Factura;
}

export type BaseRubroDetail = {
  codigo: string;
  precio: string;
  cantidad: string;

  // service
  promociones?: BaseRubroPromocionDetail[];

  // product
  producto_data?: BaseRubroDetailProductData;
  descripcion?: string;
  line_subtotal?: string;

  // 3ra edad or discapacidad
  es_tercera_edad?: boolean;
  es_discapacitado?: boolean;
  mayor_edad_discapacitado?: MayorEdadOrDiscapacidadDetail[];
};
export type BaseRubroDetailProductData = Pick<
  Producto,
  'id' | 'uuid' | 'nombre'
>;
export type BaseRubroPromocionDetail = {
  promo_id?: number;
  promo_name?: string;
  descripcion?: string;
  descuento_aplicado?: string;
};
export type MayorEdadOrDiscapacidadDetail =
  | {
      type: 'DESCUENTO';
      valor_base_plan?: string;
      valor_descuento?: string;
      disccount_percentage?: string;
    }
  | {
      type: 'ADICIONAL';
      valor_adicional_instalaciones_tercera_edad?: string;
    };
