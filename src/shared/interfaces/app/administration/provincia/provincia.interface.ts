import { PagingMetaResponse } from '@/shared/interfaces/common';
import { PaisLimitData } from '../pais';

export interface ProvinciasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Provincia[];
}

export interface Provincia {
  id?: number;
  uuid?: string;
  name: string;
  has_coverage: boolean;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  pais?: number;
  pais_data?: PaisLimitData;
}

export type ProvinciaLimitData = Pick<Provincia, 'uuid' | 'name'>;
