import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PaisesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Pais[];
}

export interface Pais {
  id?: number;
  uuid?: string;
  name: string;
  iso_code: string;
  nationality: string;
  has_coverage: boolean;

  state: boolean;
  created_at?: string;
  modified_at?: string;
}

export type PaisLimitData = Pick<Pais, 'name' | 'uuid'>;

// // country > province > city > parroquia > zona > sector
