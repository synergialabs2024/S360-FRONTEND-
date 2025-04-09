import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ActivacionManualPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ActivacionManual[];
}

export interface ActivacionManual {
  id?: number;
  uuid?: string;

  tipo_suspension: string;
  estado_suspension: string;
  cliente: number;
  linea_servicio: number;
  contrato?: number;

  created_at?: string;
  modified_at?: string;
}
