import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TipoInstalacionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: TipoInstalacion[];
}

export interface TipoInstalacion {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  codigo: string;
  descripcion: string;

  created_at?: string;
  modified_at?: string;
}

export type TipoInstalacionLimitData = Pick<TipoInstalacion, 'uuid' | 'name'>;
