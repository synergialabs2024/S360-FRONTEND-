import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface trazabilidadVentasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: TrazabilidadVenta[];
}

export interface UserData {
  username?: string;
  email?: string;
  razon_social?: string;
  uuid?: string;
}

export interface TrazabilidadVenta {
  id?: number;
  uuid?: string;

  user_data?: UserData;

  created_at?: string;
  modified_at?: string;

  modelo_name?: string;
  modelo?: number;
  modelo_estado?: string;

  user_uuid?: number;
  timestamp?: string;
  user: number;
}
