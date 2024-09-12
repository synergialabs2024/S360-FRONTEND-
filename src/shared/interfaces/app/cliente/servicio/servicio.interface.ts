import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface serviciosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Servicio[];
}

export interface Servicio {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  nombre: string;
  codigo: string;
  state: boolean;

  descripcion: string;
  precio: string;
  iva: number;
}
