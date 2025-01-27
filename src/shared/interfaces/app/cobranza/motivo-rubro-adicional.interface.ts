import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MotivosRubroAdicionalPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoRubroAdicional[];
}

export interface MotivoRubroAdicional {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;
  valor: string;
  descripcion?: string;
  state: boolean;

  created_at?: string;
  modified_at?: string;
}
