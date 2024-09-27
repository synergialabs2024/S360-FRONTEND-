import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface FlotasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Flota[];
}

export interface Flota {
  id?: number;
  uuid?: string;
  state: boolean;

  name: string;
  marca_vehiculo: string;
  modelo_vehiculo: string;
  anio_vehiculo: number;
  placa_vehiculo: string;
  color_vehiculo: string;
  email: string;
  telefono_1: string;
  telefono_2: string;
  telefono_3: string;

  es_bodega: boolean;

  hora_inicio_instalacion?: string; // HH:MM:SS
  hora_fin_instalacion?: string; // HH:MM:SS

  created_at?: string;
  modified_at?: string;

  ///* fk
  user?: number;
  area?: number;
  departamento?: number;
  lider?: number;
  auxiliar?: number;
  pais?: number;
  provincia?: number;
  ciudad?: number;
  zonas?: number[];
}

export type FlotaLimitData = Pick<Flota, 'uuid' | 'name' | 'id'>;
