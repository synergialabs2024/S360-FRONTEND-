import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface autorizacionOnusPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: AutorizacionOnu[];
}

export interface AutorizacionOnu {
  serial_number?: string;

  board?: number;
  port?: number;
  type?: string;
}

export type AutorizacionOnusLimitData = Pick<AutorizacionOnu, 'serial_number'>;
