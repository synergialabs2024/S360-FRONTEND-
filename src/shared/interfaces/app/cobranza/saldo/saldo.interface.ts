import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SaldosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  data: Saldo[];
}

export interface Saldo {
  id: number;
  uuid: string;

  monto: string;

  fecha_consumo: string;

  created_at: string;
  modified_at: string;
}

// cliente?: number;
// linea_servicio?: number;
// rubro_origina?: number;
// rubro_consume?: number;
