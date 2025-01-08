import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ScoreMonthlyUsageVentasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  data: ScoreMonthlyUsageVentas;
}

export interface ScoreMonthlyUsageVentas {
  id?: number;
  uuid?: string;

  score_letter: string;
  year: number;
  month: number;
  usage_count: number;

  created_at?: string;
  modified_at?: string;
}
