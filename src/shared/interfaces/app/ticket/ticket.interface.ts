import { PagingMetaResponse } from '../../common';
import { LineaServicio } from '../cliente';
import { FlotaLimitData } from '../mante-operacion';

export interface TicketPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Ticket[];
}

export interface Ticket {
  id?: number;
  uuid?: string;
  numero_contrato?: string;
  tipo_identificacion?: string;
  identificacion?: string;
  es_cliente?: boolean;
  razon_social?: string;
  coordenadas?: string;
  zona?: string;
  celular_adicional?: string;
  nap?: string;
  franja_horaria?: string;
  telefono?: string;
  fecha_sugerida_visita?: string;
  url_foto_opcional?: string;
  url_foto_vivienda?: string;
  linea_servicio?: number;
  origen_ticket?: number;
  asunto_ticket?: number;
  solucion_tecnico?: number;
  asunto_ticket_data?: AsuntoTicketData;
  linea_servicio_data?: LineaServicio;
  flota_data?: FlotaLimitData;

  valor_a_cobrar?: string;

  detalle_adicional_ticket?: string;

  // ESPERA - EN PROCESO - CERRADO
  estado_ticket?: string;

  estado_ticket_tecnico?: string;
}

export interface AsuntoTicketData {
  id: number;
  name: number;
  uuid: number;
  valor_cobrar: string;
}
