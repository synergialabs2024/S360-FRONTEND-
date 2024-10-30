import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface BrasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Bras[];
}

export interface Bras {
  UserID?: string;
  Username?: string;

  Interface?: string;

  IPaddress?: string;
  MAC?: string;
  Vlan?: string;
  IPv6address?: string;
  Accesstype?: string;
}

export type BrasLimitData = Pick<Bras, 'UserID' | 'Username'>;
