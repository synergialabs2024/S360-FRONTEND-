import { PagingMetaResponse } from '../../common';

export interface TicketPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Ticket[];
}

export interface Ticket {
  id?: number;
  uuid?: string;
  numero_contrato: string;
  tipo_identificacion: string;
  identificacion: string;
  es_cliente: boolean;
  razon_social: string;
  coordenadas: string;
  zona: string;
  celular_adicional: string;
  nap: string;
  origen?: number;
  asunto?: number;
  telefono: string;
  url_foto_opcional: string;
  url_foto_vivienda: string;

  valor_a_cobrar: string;

  detalle_adicional_ticket: string;
}
