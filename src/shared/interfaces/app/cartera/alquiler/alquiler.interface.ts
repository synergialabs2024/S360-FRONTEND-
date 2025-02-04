import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface AlquileresPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Alquiler[];
}

export interface Alquiler {
  id?: number;
  uuid?: string;

  descripcion: string;
  estado_alquiler: string;
  fecha_inicio: string;
  fecha_fin: string;

  es_indefinido: boolean;

  total_cuotas: number;
  cuota_actual: number;
  valor_base_cuota: string;

  // fk
  producto: number;
  cliente: number;
  linea_servicio: number;
  contrato: number;

  created_at?: string;
  modified_at?: string;
}
