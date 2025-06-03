import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUser } from '../../administration';

export interface AuditLogsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: AuditLog[];
}

export interface AuditLog {
  id?: number;
  uuid?: string;

  user_data: SystemUser;
  additional_data: string[];
  action: string;
  description: string;
  timestamp?: string;
  object_id: number;
  model_name: string;
  user: number;
  content_type: number;

  // fk
  cliente: number;
  contrato: number;
  linea_servicio: number;

  modified_at?: string;
  created_at?: string;
}
