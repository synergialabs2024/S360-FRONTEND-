import type { PagingMetaResponse } from '@/shared/interfaces/common';
import type {
  Agendamiento,
  Cliente,
  Contrato,
  OrdenTrabajo,
  Preventa,
  SolicitudServicio,
} from '../';

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

  // sales serializer ---------
  solicitud_servicio_data?: SolicitudServicio;
  preventa_data?: Preventa;
  agendamiento_data?: Agendamiento;
  orden_trabajo_data?: OrdenTrabajo;

  // helpers serializers ---------
  client_lines_data?: ClientLimiTypeData[]; // to handle switch between services (all except NO_INSTALADO)
}

export type ClientLimiTypeData = Pick<
  LineaServicio,
  'id' | 'uuid' | 'estado_linea' | 'linea_numero' | 'cliente'
>;
