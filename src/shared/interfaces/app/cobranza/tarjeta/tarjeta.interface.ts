import { TarjetaCodeTMEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TarjetasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Tarjeta[];
}

export interface Tarjeta {
  id?: number;
  uuid?: string;

  code: TarjetaCodeTMEnumChoice;
  name: string;
  state: boolean;

  created_at?: string;
  modified_at?: string;
}
