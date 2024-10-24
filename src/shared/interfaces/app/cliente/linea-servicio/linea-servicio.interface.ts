import type { PagingMetaResponse } from '@/shared/interfaces/common';
import type { Cliente, Contrato } from '../';

export interface LineasServicioPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: LineaServicio[];
}

export interface LineaServicio {
  id: number;
  uuid: string;

  estado_linea: string;
  linea_numero: number;

  created_at?: string;
  modified_at?: string;

  ///* fk
  cliente?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  cliente_data?: Cliente;
  contrato_data?: Contrato;
}
