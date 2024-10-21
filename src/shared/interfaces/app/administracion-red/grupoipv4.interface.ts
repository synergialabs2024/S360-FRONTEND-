import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Router } from './router';

export interface GruposIPv4PaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: GrupoIPv4[];
}

export interface GrupoIPv4 {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;

  ipv_4: string;
  cidr: number;
  tipo_uso: string;

  ips_detalle: IPv4Detail[];
  ips_disponibles_count: number;
  ips_total: number;

  created_at?: string;
  modified_at?: string;

  routers_data?: Router[];
}

export interface IPv4Detail {
  ip: string;
  available: boolean;
}
