import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface RutasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Ruta[];
}

export interface Ruta {
  id?: number;
  uuid?: string;

  state: boolean;

  status: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
}

export type RutaLimitData = Pick<Ruta, 'id' | 'uuid' | 'status'>;
