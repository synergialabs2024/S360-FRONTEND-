import { PagingMetaResponse } from '@/shared/interfaces/common';
import {
  CiudadLimitData,
  MetodoPago,
  PaisLimitData,
  ProvinciaLimitData,
  SectorLimitData,
  ZonaLimitData,
} from '../../administration';
import { PlanInternetLimitData } from '../../servicios';

export interface PromocionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Promocion[];
}

export interface Promocion {
  id?: number;
  uuid?: string;
  name: string;
  tipo_descuento: string; // choice
  valor_descuento: string;
  fecha_inicio: string;
  fecha_fin: string;
  prioridad: number;
  recurrencia: string; // choice

  state: boolean;
  created_at?: string;
  modified_at?: string;

  // fk
  facturas_gratis?: number[];
  facturas_descuento?: number[];

  paises?: number[] | string[];
  provincias?: number[] | string[];
  ciudades?: number[] | string[];
  zonas?: number[] | string[];
  sectores?: number[] | string[];
  canales_venta?: number[] | string[];
  planes?: number[] | string[];
  metodo_pagos?: number[] | string[];

  opciones_productos_incluye?: ProductoPromocionItem[];
  opciones_productos_descuento?: ProductoDisccountItem[];
  opciones_productos_premio?: ProductoDisccountItem[];

  planes_data?: PlanInternetLimitData[];
  paises_data?: PaisLimitData[];
  provincias_data?: ProvinciaLimitData[];
  ciudades_data?: CiudadLimitData[];
  zonas_data?: ZonaLimitData[];
  sectores_data?: SectorLimitData[];
  metodo_pagos_data?: MetodoPago[];
}

export type PromocionLimitData = Pick<
  Promocion,
  | 'name'
  | 'uuid'
  | 'id'
  | 'tipo_descuento'
  | 'valor_descuento'
  | 'facturas_descuento'
  | 'facturas_gratis'
  | 'opciones_productos_incluye'
  | 'opciones_productos_descuento'
>;

export interface ProductoPromocionItem {
  codigo: string; // code unique
  nombre: string;
  opciones: OpcionProductoPromocionItem[];
  categoria: string; // category_code
}

export interface ProductoDisccountItem {
  codigo: string;
  nombre: string;
  descuento: string; // %: 100
  categoria: string; // category_code
}

export interface PromocionPremioItem {
  codigo: string;
  nombre: string;
  descuento: string; // %: 100
  categoria: string; // category_code
  uuid: string; // select in frontend
}

export interface OpcionProductoPromocionItem {
  uuid: string;

  tipo_pago: string; // valueTipoRecuerrenciaAlquilerEnumChoice

  valor: string;
  cuotas: number;
  cantidad: number;
}
