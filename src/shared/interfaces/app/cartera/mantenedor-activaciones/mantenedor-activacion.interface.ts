import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MantenedorActivacionPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MantenedorActivacion[];
}

export interface MantenedorActivacion {
  id?: number;
  uuid?: string;
  criterio: number;
  mantenedor_base: number;
  motivo: number;
  code: string;
  state: boolean;
  permitido_en_anio: number;
  created_at?: string;
  modified_at?: string;
}
