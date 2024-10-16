import { PagingMetaResponse } from '@/shared/interfaces/common';
import { EmpresaLimitData } from '../empresa';

export interface AreasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Area[];
}

export interface Area {
  id?: number;
  uuid?: string;

  name: string;
  description: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  empresa?: number;

  empresa_data?: EmpresaLimitData;
}

export type AreaLimitData = Pick<Area, 'uuid' | 'name'>;
