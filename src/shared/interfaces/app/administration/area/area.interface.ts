import { PagingMetaResponse } from '@/shared/interfaces/common';
import { EmpresaLimitData } from '../empresa';
import { CentroCostoLimitData } from '../centro-costo';

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
  code: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  centro_costo?: number;
  empresa?: number;

  centro_costo_data?: CentroCostoLimitData;
  empresa_data?: EmpresaLimitData;
}

export type AreaLimitData = Pick<Area, 'uuid' | 'name'>;
