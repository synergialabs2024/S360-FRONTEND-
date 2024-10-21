import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Router } from './router';

export interface GruposIPv6PaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: GrupoIPv6[];
}

export interface GrupoIPv6 {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;

  ipv_6: string;
  cidr: number;
  tipo_uso: string;

  ips_detalle: IPv6Detail[];
  ips_disponibles_count: number;
  ips_total: number;

  created_at?: string;
  modified_at?: string;

  routers_data?: Router[];
}

export interface IPv6Detail {
  ip: string;
  available: boolean;
}
