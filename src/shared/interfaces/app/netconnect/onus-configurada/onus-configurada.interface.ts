import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface onusConfiguradasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: OnusConfigurada[];
}

export interface OnusConfigurada {
  id_cliente?: number;

  estado_cliente?: string;
  nombre?: string;
  alias?: string;
  sn_mac?: string;
  potencia?: string;

  estado_onu?: string;
  last_down_cause?: string;
  pppuser?: string;
  pppass?: string;
  plan?: string;
  ip?: string;
  nodo?: number;
  onu?: string;
  modelo?: string;
  srv_port?: number;
  vlan?: number;
}

export type OnusConfiguradasLimitData = Pick<OnusConfigurada, 'id_cliente'>;
