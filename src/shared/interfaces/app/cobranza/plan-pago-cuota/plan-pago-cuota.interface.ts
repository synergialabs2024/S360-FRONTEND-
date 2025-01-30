import { PagingMetaResponse } from '@/shared/interfaces/common';
import { ClientLimiTypeData } from '../../cliente';

export interface PlanPagoCuotaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PlanPagoCuota[];
}

export interface PlanPagoCuota {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  estado_deuda: string;
  total_cuotas: number;
  monto_total: string;
  fecha_fin: string;

  detalle: string[];

  ///* fk
  linea_servicio: number;
  linea_servicio_data?: ClientLimiTypeData;
}
