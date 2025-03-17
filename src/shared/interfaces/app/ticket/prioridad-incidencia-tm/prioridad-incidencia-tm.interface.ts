import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PrioridadIncidenciaTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PrioridadIncidenciaTM[];
}

export interface PrioridadIncidenciaTM {
  id?: number;
  uuid?: string;

  name: string;
  code: string;
  state: boolean;
  color_hex: string;
  user_create: string;
  audit_logs?: AuditLogsPITM[];

  created_at?: string;
  modified_at?: string;
}

export interface AuditLogsPITM {
  id?: number;
  uuid?: string;

  name: string;
  code: string;
  state: boolean;
  color_hex: string;
  user_create: string;
  description: string;
  additional_data: string[];
  audit_logs?: {
    name: string;
    color_hex: string;
    code: string;
  };
  modified_at?: string;
  created_at?: string;
}

export type PrioridadIncidenciaTMLimitData = Pick<
  PrioridadIncidenciaTM,
  'id' | 'uuid'
>;
