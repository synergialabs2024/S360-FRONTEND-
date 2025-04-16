import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Ticket } from '../../ticket/ticket.interface';

export interface CambioDomicilioPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CambioDomicilio[];
}

export interface CambioDomicilio {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;

  linea_servicio: number;
  ticket_visita_body: Ticket;
  new_coordenadas: string;
  new_direccion_referencia: string;
  new_pais: number;
  new_provincia: number;
  new_ciudad: number;
  new_zona: number;
  new_sector: number;
}
