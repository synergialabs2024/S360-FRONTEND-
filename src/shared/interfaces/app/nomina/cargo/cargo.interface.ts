import { PagingMetaResponse } from '@/shared/interfaces/common';
import { EmpresaLimitData } from '../../administration/empresa';

export interface CargosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Cargo[];
}

export interface Cargo {
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

export type CargoLimitData = Pick<Cargo, 'uuid' | 'name'>;
