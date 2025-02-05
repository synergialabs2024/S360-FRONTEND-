import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MotivoEgresoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoEgreso[];
}

export interface MotivoEgreso {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;
  descripcion: string;
  tipo: string;

  created_at?: string;
  modified_at?: string;
}

export type MotivoEgresoLimitData = Pick<MotivoEgreso, 'uuid' | 'id'>;
