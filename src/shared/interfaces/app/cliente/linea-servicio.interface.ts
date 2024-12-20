import type { PagingMetaResponse } from '@/shared/interfaces/common';
import type {
  Agendamiento,
  BrasLimitData,
  Ciudad,
  Cliente,
  Contrato,
  EntidadFinanciera,
  FlotaLimitData,
  MetodoPago,
  NapLimitData,
  NodoLimitData,
  OLTLimitData,
  OrdenTrabajo,
  PaisLimitData,
  Preventa,
  PromocionLimitData,
  ProvinciaLimitData,
  SectorLimitData,
  SolicitudServicio,
  Tarjeta,
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
  ciudad_data?: Ciudad;
  zona_data?: ZonaLimitData;
  sector_data?: SectorLimitData;

  preventa_data?: Preventa;
  nap_data?: Omit<NapLimitData, 'puertos_list'>;
  metodo_pago_data?: MetodoPago;
  entidad_financiera_data?: EntidadFinanciera;
  tarjeta_data?: Tarjeta;

  agendamiento_data?: Agendamiento;

  orden_trabajo_data?: OrdenTrabajo;
  flota_data?: FlotaLimitData;
  nodo_data?: NodoLimitData;
  olt_data?: OLTLimitData;
  brass_data?: BrasLimitData;

  // helpers serializers ---------
  client_lines_data?: ClientLimiTypeData[]; // to handle switch between services (all except NO_INSTALADO)

  promociones_data?: PromocionLimitData[]; // contract.promociones
}

export type ClientLimiTypeData = Pick<
  LineaServicio,
  'id' | 'uuid' | 'estado_linea' | 'linea_numero' | 'cliente'
> & {
  contrato_data?: Pick<Contrato, 'numero_contrato' | 'identificacion_pago'>;
};
