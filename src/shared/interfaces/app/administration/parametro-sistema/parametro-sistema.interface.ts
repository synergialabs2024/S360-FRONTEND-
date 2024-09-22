import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ParametrosSistemasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ParametroSistema[];
}

export interface ParametroSistema {
  id?: number;
  uuid?: string;
  name: string;
  slug: string; // SystemParamsSlugsEnum
  value: string;
  description: string;
  type: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;
}

export type ParametroSistemaLimitData = Pick<ParametroSistema, 'name' | 'uuid'>;
