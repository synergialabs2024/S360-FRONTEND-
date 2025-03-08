import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface EventoMensajeriaTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: EventoMensajeriaTM[];
}

export interface EventoMensajeriaTM {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  imagen: string;

  created_at?: string;
  modified_at?: string;
}

export type EventoMensajeriaTMLimitData = Pick<
  EventoMensajeriaTM,
  'id' | 'uuid'
>;
