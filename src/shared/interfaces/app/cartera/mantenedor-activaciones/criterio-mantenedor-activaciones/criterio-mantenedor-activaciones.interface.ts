import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CriterioMantenedorActivacionBasePaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CriterioMantenedorActivacion[];
}

export interface CriterioMantenedorActivacion {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;
}
