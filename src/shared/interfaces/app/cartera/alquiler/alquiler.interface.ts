import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUser } from '../../administration';

export interface AlquileresPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Alquiler[];
}

export interface Alquiler {
  id?: number;
  uuid?: string;

  descripcion: string;
  tipo_recurrencia: string;
  valor_base_cuota: string;
  total_cuotas: number;

  fecha_inicio?: string;
  fecha_fin?: string;
  estado_alquiler?: string;
  cuota_actual?: number;
  audit_logs?: AuditLogs[];

  // fk
  producto: number;
  cliente: number;
  linea_servicio: number;
  contrato: number;

  created_at?: string;
  modified_at?: string;
}

export interface AuditLogs {
  id?: number;
  uuid?: string;

  user_data: SystemUser;

  action: string;
  description: string;
  object_id: number;
  additional_data: string[];
  user: number;
  content_type: number;

  timestamp?: string;
  modified_at?: string;
  created_at?: string;
}
