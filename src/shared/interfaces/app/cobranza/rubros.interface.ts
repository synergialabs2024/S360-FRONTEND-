import { EstadoRubroEnumChoice, TipoRubroEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { ClienteLimitData, ContratoLimitData } from '../cliente';
import { Producto } from '../inventario';
import { OrdenTrabajoLimitData } from '../tecnico';
import { Factura } from './factura.interface';
import { Saldo } from './saldo.interface';

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

  ifi?: string;

  created_at?: string;
  modified_at?: string;

  generar_factura?: boolean;
  valor_factura?: string;

  ///* fk
  cliente?: number;
  linea_servicio?: number;
  contrato?: number;

  cliente_data?: ClienteLimitData;
  contrato_data?: ContratoLimitData;
  factura_data?: Factura;

  orden_trabajo_data?: OrdenTrabajoLimitData;

  rubro_items_data?: RubroItemData[];

  // helpers no models -----
  saldo_rubro_consume_data?: Saldo[];
  saldo_rubro_origen_data?: Saldo[];
}

export type RubroItemData = {
  id: number;
  uuid?: string;

  tipo_rubro_item: TipoRubroEnumChoice;

  descripcion: string;
  valor_base: string;
  cantidad: number;
  impuesto: string;

  // si se puede eliminar del detalle del rubro
  removible: boolean;
  state: boolean; // false = eliminado

  codigo_producto?: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  rubro?: number;
  plan_internet?: number;
  producto?: number;
  default_iva?: number;

  producto_data?: Producto;
};

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
export type RubroStatisticsLine = {
  linea_servicio: number;
  cliente: number;
  contrato: number;
  configuracion_plantilla: number;
  statistics: {
    total_rubros_servicio_with_mikro: number;
    total_rubros_servicio_without_mikro: number;
    total_rubros_servicio_with_mikro_pagados: number;
    total_rubros_servicio_without_mikro_pagados: number;
    total_rubros_libre: number;
    total_rubros_producto: number;
    total_rubros: number;
    total_rubros_pagados: number;
    total_rubros_no_pagados: number;
  };
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
