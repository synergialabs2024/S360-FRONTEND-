import { PagingMetaResponse } from '@/shared/interfaces/common';
import { PaisLimitData } from '../pais';
import { ProvinciaLimitData } from '../provincia';

export interface CiudadesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Ciudad[];
}

export interface Ciudad {
  id?: number;
  uuid?: string;
  name: string;
  metraje_autorizado: string;
  has_coverage: boolean;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  pais: number;
  provincia: number;

  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
}

export type CiudadLimitData = Pick<Ciudad, 'uuid' | 'name'>;
