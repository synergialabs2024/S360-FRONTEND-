import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface AutenticacionClientesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: AutenticacionCliente[];
}

export interface AutenticacionCliente {
  UserID?: string;
  Username?: string;

  Interface?: string;

  IPaddress?: string;
  MAC?: string;
  Vlan?: string;
  IPv6address?: string;
  Accesstype?: string;
}

export type AutenticacionClienteLimitData = Pick<
  AutenticacionCliente,
  'UserID' | 'Username'
>;
