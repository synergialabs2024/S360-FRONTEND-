import { PagingMetaResponse } from '@/shared/interfaces/common';
import {
  CiudadLimitData,
  PaisLimitData,
  ProvinciaLimitData,
  SectorLimitData,
  ZonaLimitData,
} from '../../administration';
import { PlanLimitData } from '../../servicios';

export interface PromocionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Promocion;
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

  paises?: number[] | string[];
  provincias?: number[] | string[];
  ciudades?: number[] | string[];
  zonas?: number[] | string[];
  sectores?: number[] | string[];
  canales_venta?: number[] | string[];
  planes?: number[] | string[];
  meses_gratis?: number[] | string[];
  meses_descuento?: number[] | string[];

  planes_data?: PlanLimitData[];
  paises_data?: PaisLimitData[];
  provincias_data?: ProvinciaLimitData[];
  ciudades_data?: CiudadLimitData[];
  zonas_data?: ZonaLimitData[];
  sectores_data?: SectorLimitData[];
}
