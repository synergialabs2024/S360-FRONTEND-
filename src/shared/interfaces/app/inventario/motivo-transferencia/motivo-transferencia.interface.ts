import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MotivoTransferenciaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoTransferencia[];
}

export interface MotivoTransferencia {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;
  descripcion: string;
  tipo: string;

  created_at?: string;
  modified_at?: string;
}

export type MotivoTransferenciaLimitData = Pick<
  MotivoTransferencia,
  'uuid' | 'id'
>;
