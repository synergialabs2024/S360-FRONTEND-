import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface EncuestaRelacionalPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: EncuestaRelacional[];
}

export interface EncuestaRelacional {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;

  answers: {};
  template: number;
  linea_servicio: number;
  asesor: number;
}
