import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SaldosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Saldo[];
}

export interface Saldo {
  id?: number;
  uuid?: string;

  monto: string;

  fecha_consumo?: string;

  created_at: string;
  modified_at: string;

  ///* fk
  rubro_origina?: number;
  rubro_consume?: number;
  cliente?: number;
  linea_servicio?: number;
}
