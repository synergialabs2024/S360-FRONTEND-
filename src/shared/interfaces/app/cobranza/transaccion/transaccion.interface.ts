import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TransaccionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Transaccion[];
}

export interface Transaccion {
  id?: number;
  uuid?: string;

  monto: string;

  codigo_transaccion: string;

  created_at: string;
  modified_at: string;

  ///* fk ----------
  rubro: number;
  saldo: null;
  metodo_pago: number;
  cliente: number;
  linea_servicio: number;

  // switch
  id_switch: string;
  entidad_financiera: string;
}
