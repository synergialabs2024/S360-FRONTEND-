import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PagoOficinaVirtualLogsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PagoOficinaVirtualLog[];
}

export interface PagoOficinaVirtualLog {
  id?: number;
  uuid?: string;

  estado: string;
  identification_button: string;
  razon_social: string;
  identificacion: string;
  deuda: string;
  authorization_code: string;
  status: string;
  reference: string;
  client_id: string;
  transaction_date: string;
  message: string;
  card_number: string;
  card_brand: string;
  card_holder: string;
  ip_address: string;
  custom_value: string;
  expiry_month: string;
  expiry_year: string;
  number: string;
  card_type: string;
  card_token: string;
  linea_numero: string;

  //* fk
  linea_servicio: number;
  cliente: number;

  created_at?: string;
  modified_at?: string;
}

export type PagoOficinaVirtualLogLimitData = Pick<
  PagoOficinaVirtualLog,
  'identificacion' | 'estado'
>;
