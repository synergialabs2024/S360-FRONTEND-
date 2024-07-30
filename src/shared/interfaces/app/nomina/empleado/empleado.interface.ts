import { PagingMetaResponse } from '@/shared/interfaces/common';
import {
  AreaLimitData,
  CanalVentaLimitData,
  CiudadLimitData,
  DepartamentoLimitData,
  EmpresaLimitData,
  PaisLimitData,
  ProvinciaLimitData,
  SectorLimitData,
  ZonaLimitData,
} from '../../administration';
import { CargoLimitData } from '../cargo';

export interface EmpleadosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Empleado;
}

export interface Empleado {
  id?: number;
  uuid?: string;

  razon_social: string;
  tipo_identificacion: string;
  identificacion: string;
  address: string;
  email: string;
  phone_1: string;
  phone_2: string;
  phone_3: string;
  salary: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  tipo_empleado: string; // choice

  ///* fk
  empresa?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  cargo?: number;
  pais?: number;
  provincia?: number;
  ciudad?: number;
  zona?: number;
  sector?: number;
  user?: number; // only to sign in erp system

  empresa_data?: EmpresaLimitData;
  area_data?: AreaLimitData;
  departamento_data?: DepartamentoLimitData;
  canal_venta_data?: CanalVentaLimitData;
  cargo_data?: CargoLimitData;
  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
  ciudad_data?: CiudadLimitData;
  zona_data?: ZonaLimitData;
  sector_data?: SectorLimitData;
}
