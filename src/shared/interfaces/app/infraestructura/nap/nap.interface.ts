import { PagingMetaResponse, PuertoType } from '@/shared/interfaces/common';
import { CiudadLimitData, SectorLimitData } from '../../administration';
import { NodoLimitData } from '../nodo';
import { OLTLimitData } from '../olt';

export interface NapsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Nap[];
}

export interface Nap {
  id?: number;
  uuid?: string;
  state: boolean;

  name: string;
  direccion: string;
  coordenadas: string;
  puertos?: number;
  puertos_list?: PuertoType[];
  es_soterrado: boolean;
  status_nap: string;
  proyecto_cod: string;
  distance?: number; // calc based on coords only for coordenadas_radio filter
  latitude?: string;
  longitude?: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  nodo: number;
  olt: number;
  ciudad: number;
  sector: number;

  nodo_data?: NodoLimitData;
  olt_data?: OLTLimitData;
  ciudad_data?: CiudadLimitData;
  sector_data?: SectorLimitData;
}

export type NapLimitData = Pick<
  Nap,
  | 'uuid'
  | 'name'
  | 'id'
  | 'state'
  | 'coordenadas'
  | 'es_soterrado'
  | 'status_nap'
  | 'proyecto_cod'
>;
