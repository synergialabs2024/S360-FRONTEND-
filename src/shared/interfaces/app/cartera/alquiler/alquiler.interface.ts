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
  tipo_recurrencia: string;
  valor_base_cuota: string;
  total_cuotas: number;

  fecha_inicio?: string;
  fecha_fin?: string;
  estado_alquiler?: string;
  cuota_actual?: number;

  // fk
  producto: number;
  cliente: number;
  linea_servicio: number;
  contrato: number;

  created_at?: string;
  modified_at?: string;
}
