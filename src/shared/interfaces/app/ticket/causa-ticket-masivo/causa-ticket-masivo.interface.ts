import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CausaTicketMasivoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CausaTicketMasivo[];
}

export interface CausaTicketMasivo {
  id?: number;
  uuid?: string;

  name: string;
  descripcion: string;
  state: boolean;
  tipo_causa: string;

  created_at?: string;
  modified_at?: string;
}

export type CausaTicketMasivoLimitData = Pick<CausaTicketMasivo, 'id' | 'uuid'>;
