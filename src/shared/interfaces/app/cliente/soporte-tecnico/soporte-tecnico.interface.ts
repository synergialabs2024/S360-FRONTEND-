import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SoporteTecnicoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SoporteTecnico[];
}

export interface SoporteTecnico {
  id?: number;
  uuid?: string;

  cedula: number;
}

export type SoporteTecnicoLimitData = Pick<SoporteTecnico, 'cedula'>;
