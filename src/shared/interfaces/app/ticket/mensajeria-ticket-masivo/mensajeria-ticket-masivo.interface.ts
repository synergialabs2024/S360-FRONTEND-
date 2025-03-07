import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MensajeriaTicketMasivoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MensajeriaTicketMasivo[];
}

export interface MensajeriaTicketMasivo {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  description: string;

  created_at?: string;
  modified_at?: string;
}

export type MensajeriaTicketMasivoLimitData = Pick<
  MensajeriaTicketMasivo,
  'id' | 'uuid'
>;
