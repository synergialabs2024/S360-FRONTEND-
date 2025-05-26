import { CoordenadasTypeString, ZonaSemaforoTMEnumChoice } from '@/shared';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { ProvinciaLimitData } from '../provincia';
import { CiudadLimitData } from '../ciudad';
import { PaisLimitData } from '../pais';

export interface ZonasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Zona[];
}

export interface Zona {
  id?: number;
  uuid?: string;
  name: string;
  has_coverage: boolean;
  uid: string;
  semaforo: ZonaSemaforoTMEnumChoice;

  coordenadas?: CoordenadasTypeString[][];

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  pais: number;
  provincia: number;
  ciudad: number;

  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
  ciudad_data?: CiudadLimitData;
}

export type ZonaLimitData = Pick<Zona, 'uuid' | 'name'>;
