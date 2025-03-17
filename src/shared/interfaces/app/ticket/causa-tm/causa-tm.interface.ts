import { tipoCausaTicketMasivoEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CausaTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CausaTM[];
}

export interface CausaTM {
  id?: number;
  uuid?: string;

  name: string;
  description: string;
  state: boolean;
  tipo_causa: tipoCausaTicketMasivoEnumChoice;

  created_at?: string;
  modified_at?: string;
}

export type CausaTMLimitData = Pick<CausaTM, 'id' | 'uuid'>;
