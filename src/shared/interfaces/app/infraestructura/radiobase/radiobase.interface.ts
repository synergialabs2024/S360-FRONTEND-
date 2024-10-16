import { PagingMetaResponse } from '@/shared/interfaces/common';
import {
  CiudadLimitData,
  PaisLimitData,
  ProvinciaLimitData,
  SectorLimitData,
  ZonaLimitData,
} from '../../administration';

export interface RadioBasesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: RadioBase[];
}

export interface RadioBase {
  id?: number;
  uuid?: string;
  state: boolean;

  name: string;
  codigo: string;
  direccion: string;
  coordenadas: string;

  ///* fk
  pais: number;
  provincia: number;
  ciudad: number;
  zona: number;
  sector: number;

  pais_data: PaisLimitData;
  provincia_data: ProvinciaLimitData;
  ciudad_data: CiudadLimitData;
  zona_data: ZonaLimitData;
  sector_data: SectorLimitData;
}

export type RadioBaseLimitData = Pick<RadioBase, 'uuid' | 'id'>;
