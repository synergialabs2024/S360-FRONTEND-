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

  has_coverage: boolean;
  metraje_autorizado?: string;
  precio_metraje_excedido?: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  pais: number;
  provincia: number;

  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
}

export type CiudadLimitData = Pick<Ciudad, 'uuid' | 'name' | 'id'>;
