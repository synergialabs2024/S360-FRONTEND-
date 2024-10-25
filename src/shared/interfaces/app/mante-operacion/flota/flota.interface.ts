import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUserLimitData } from '../../administration';
import { Bodega, Ubicacion } from '../../inventario';

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

  es_ubicacion: boolean;

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

  bodega?: number; // onlhy this in post to create ubicacion in backend
  ubicacion?: number;

  auxiliar_data?: SystemUserLimitData;
  lider_data?: SystemUserLimitData;
  bodega_data?: Bodega;
  ubicacion_data?: Ubicacion;
}

export type FlotaLimitData = Pick<
  Flota,
  | 'uuid'
  | 'name'
  | 'id'
  | 'state'
  | 'zonas'
  | 'lider'
  | 'auxiliar'
  | 'auxiliar_data'
  | 'lider_data'
  | 'ubicacion_data'
  | 'bodega_data'
>;
