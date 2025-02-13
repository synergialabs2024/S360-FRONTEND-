import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PromesaPagoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PromesaPago[];
}

export interface PromesaPago {
  id?: number;
  uuid?: string;

  fecha_registro: string;
  hora_registro: string;

  responsable_registro: string;
  calificacion_contrato: string;
  fecha_para_promesa_pago: string;

  created_at?: string;
  modified_at?: string;
}
