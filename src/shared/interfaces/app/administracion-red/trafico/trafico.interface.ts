import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TraficosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Trafico[];
}

export interface TraficoPing {
  Host?: string;
  Size?: string;
  TTL?: string;
  Time?: string;
}

export interface TraficoTrace {
  Address?: string;
  Last?: string;
  Loss?: string;
}

export interface TraficoDetalleConsumo {
  acctinputoctets?: number;
  acctoutputoctets?: number;

  acctstarttime?: string;
  acctstoptime?: string;
  framedipaddress?: string;
  framedipv6prefix?: string;
  acctsessiontime?: string;

  radacctid?: number;
  username?: string;
}

export interface Trafico {
  id?: number;
  username: string;
}

export type TraficoLimitData = Pick<Trafico, 'id' | 'username'>;
