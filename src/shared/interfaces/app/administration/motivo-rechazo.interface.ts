import { MotivoRechazoModuloEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MotivosRechazoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoRechazo[];
}

export interface MotivoRechazo {
  id?: number;
  uuid?: string;

  name: string;
  description: string;
  state: boolean;
  codigo: string;

  modulo: MotivoRechazoModuloEnumChoice;

  created_at?: string;
  modified_at?: string;
}
