import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface GestionOnusPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: GestionOnu[];
}

export interface GestionOnu {
  id_cliente?: number;

  nombre?: string;
  alias?: string;
  sn_mac?: string;

  estado_onu?: string;
}

export type GestionOnuLimitData = Pick<GestionOnu, 'id_cliente'>;
