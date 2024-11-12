import type { PagingMetaResponse } from '@/shared/interfaces/common';
import type {
  Agendamiento,
  CiudadLimitData,
  Cliente,
  Contrato,
  NapLimitData,
  OrdenTrabajo,
  PaisLimitData,
  Preventa,
  ProvinciaLimitData,
  SectorLimitData,
  SolicitudServicio,
  ZonaLimitData,
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

  // sales serializer -------------
  solicitud_servicio_data?: SolicitudServicio;
  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
  ciudad_data?: CiudadLimitData;
  zona_data?: ZonaLimitData;
  sector_data?: SectorLimitData;

  preventa_data?: Preventa;
  nap_data?: Omit<NapLimitData, 'puertos_list'>;

  agendamiento_data?: Agendamiento;

  orden_trabajo_data?: OrdenTrabajo;

  // helpers serializers ---------
  client_lines_data?: ClientLimiTypeData[]; // to handle switch between services (all except NO_INSTALADO)
}

export type ClientLimiTypeData = Pick<
  LineaServicio,
  'id' | 'uuid' | 'estado_linea' | 'linea_numero' | 'cliente'
> & {
  contrato_data?: Pick<Contrato, 'numero_contrato' | 'identificacion_pago'>;
};
