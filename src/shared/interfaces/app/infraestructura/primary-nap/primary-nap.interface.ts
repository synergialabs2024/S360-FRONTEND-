import { PagingMetaResponse } from '@/shared/interfaces/common';
import { NapPortType } from '../nap';
import { NodoLimitData } from '../nodo';
import { CiudadLimitData, SectorLimitData } from '../../administration';
import { RutaLimitData } from '../ruta';
import { OLTLimitData } from '../olt';

export interface PrimaryNapsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PrimaryNap[];
}

export interface PrimaryNap {
  id?: number;
  uuid?: string;

  state: boolean;

  name: string;
  direccion: string;
  coordenadas: string;
  latitude: string;
  longitude: string;
  puertos?: number;
  puertos_list?: NapPortType[];
  es_soterrado: boolean;
  minimum_power: string;
  maximum_power: string;
  proyecto_cod: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  port_pon?: number;
  ruta?: number;
  nodo?: number;
  olt?: number;
  ciudad?: number;
  sector?: number;
  olt_id?: number;

  port_pon_data?: PrimaryNapPortPonOLT;
  ruta_data?: RutaLimitData;
  nodo_data?: NodoLimitData;
  olt_data?: OLTLimitData;
  ciudad_data?: CiudadLimitData;
  sector_data?: SectorLimitData;
}

export interface PrimaryNapPortPonOLT {
  id?: number;
  coordinate?: number;
  ifspeed?: number;
  status?: 2;
  port_pont_location?: string;
  frame?: number;
  slot?: number;
  port?: number;
}

export type PrimaryNapLimitData = Pick<
  PrimaryNap,
  | 'uuid'
  | 'name'
  | 'id'
  | 'state'
  | 'coordenadas'
  | 'es_soterrado'
  | 'proyecto_cod'
  | 'puertos_list'
>;
