import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CambioPlanPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CambioPlan[];
}

export interface CambioPlan {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;
  plan_internet_anterior: number;
  plan_internet_nuevo: number;
  rubro: number;
  cliente: number;
  contrato: number;
  linea_servicio?: number;

  //
}

export interface CambioPlanComputeValores {
  months_block: number;
  last_change_created_at: string;
  ultimo_cambio_meses: number;
  diff_days: number;
  diff_prices: string;
  valor_per_day: string;
  valor_proporcional: string;
  fecha_pago_rubro: string;
  fecha_vencimiento_rubro: string;
  current_plan: {
    id: number;
    name: string;
    valor: string;
    valor_total: string;
  };
  new_plan: {
    id: number;
    name: string;
    valor: string;
    valor_total: string;
  };
}
