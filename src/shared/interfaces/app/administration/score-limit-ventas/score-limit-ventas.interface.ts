import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ScoreLimitVentasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  data: ScoreLimitVentas[];
}

export interface ScoreLimitVentas {
  id?: number;
  uuid?: string;

  state: boolean; // false means no aplicable

  score_letter: string;
  monthly_limit: number;

  created_at?: string;
  modified_at?: string;
}
