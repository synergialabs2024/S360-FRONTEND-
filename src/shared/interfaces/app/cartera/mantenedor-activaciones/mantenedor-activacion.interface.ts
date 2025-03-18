import { PagingMetaResponse } from '@/shared/interfaces/common';
import { MantenedorActivacionBase } from './mantenedor-activacion-base.interface';

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
  state?: boolean;
  motivo_base?: string;
  mantenedor_base_data?: MantenedorActivacionBase;
  permitido_en_anio?: number;
  created_at?: string;
  modified_at?: string;
}
