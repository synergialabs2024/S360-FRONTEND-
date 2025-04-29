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

export interface SoporteTecnicoCliente {
  celular: string;
  email: string;
  direccion_referencia: string;
}

export type SoporteTecnicoLimitData = Pick<SoporteTecnico, 'cedula'>;
