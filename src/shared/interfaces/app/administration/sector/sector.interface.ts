import { PagingMetaResponse } from '@/shared/interfaces/common';
import { PaisLimitData } from '../pais';
import { ProvinciaLimitData } from '../provincia';
import { CiudadLimitData } from '../ciudad';
import { ZonaLimitData } from '../zona';

export interface SectoresPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Sector[];
}

export interface Sector {
  id?: number;
  uuid?: string;
  name: string;
  has_coverage: boolean;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  pais: number;
  provincia: number;
  ciudad: number;
  zona: number;

  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
  ciudad_data?: CiudadLimitData;
  zona_data?: ZonaLimitData;
}

export type SectorLimitData = Pick<Sector, 'uuid' | 'name'>;
