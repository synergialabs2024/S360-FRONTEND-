import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface DepartamentosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Departamento[];
}

export interface Departamento {
  id?: number;
  uuid?: string;
  name: string;
  description: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  empresa?: number;
  area?: number;
}

export type DepartamentoLimitData = Pick<Departamento, 'uuid' | 'name'>;
