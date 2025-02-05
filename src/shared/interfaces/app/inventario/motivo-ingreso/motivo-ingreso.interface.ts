import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MotivoIngresoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoIngreso[];
}

export interface MotivoIngreso {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;
  descripcion: string;
  tipo: string;

  created_at?: string;
  modified_at?: string;
}

export type MotivoIngresoLimitData = Pick<MotivoIngreso, 'uuid' | 'id'>;
