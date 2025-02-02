import {
  Agendamiento,
  Brass,
  Ciudad,
  EstadoActivacionEnumChoice,
  EstadoAuditoriaOTInstallEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
  FlotaLimitData,
  LineaServicio,
  MotivoCorreccionOTAuditoriaEnumChoice,
  MotivoRechazo,
  Nap,
  Nodo,
  OLT,
  Preventa,
  ProvinciaLimitData,
  SectorLimitData,
  SolicitudServicio,
  TipoActualizacionActivacionesEnumChoice,
  TipoOrdenTrabajoEnumChoice,
  TrazabilidadVentas,
  ZonaLimitData,
} from '@/shared';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface OrdenesTrabajoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: OrdenTrabajo[];
}

export interface OrdenTrabajo {
  id?: number;
  uuid?: string;
  estado_orden_trabajo: EstadoOrdenTrabajoEnumChoice; // choice
  tipo_orden_trabajo: TipoOrdenTrabajoEnumChoice; // choice

  numero_referencia?: string;
  codigo?: string;

  hora_inicio: string; // timestamp
  hora_fin: string; // timestamp
  hora_inicio_real?: string; // timestamp - tecnico

  // INVENTARIO -------------------
  equipos_utilizados: EquipoUtilizadosInstallOT[];
  materiales_utilizados: MaterialUtilizadosInstallOT[];

  punta_inicial_fibra: string;
  punta_final_fibra: string;
  metraje_utilizado_fibra: string;
  metraje_exedente_fibra: string;
  serie_ont?: string;
  potencia_ont: string;
  observaciones_adicionales: string;
  modelo_fibra_utilizada: string; // code
  modelo_ont_wifi: string; // code

  url_foto_ont: string;
  url_foto_potencia_ont: string;
  url_foto_ont_encontrado_casa: string;
  url_foto_etiqueta: string;
  url_foto_nap: string;
  url_foto_potencia_nap: string;
  url_foto_premio: string;
  url_foto_test_speed: string;
  url_foto_acta_entrega_ups?: string;
  url_foto_wifi_mesh?: string;

  // ACTIVACION -------------------
  estado_activacion: EstadoActivacionEnumChoice;
  ipv4: string;
  ipv6: string;
  pppoe: string;
  pppassword: string;
  observacion_activacion?: string | null;
  observacion_prerechazo?: string | null;
  descripcion?: string | null;
  luz_verde: boolean;

  // cambio puerto ya no va, tecnico lo upd ---------------
  tipo_actualizacion_puerto?: TipoActualizacionActivacionesEnumChoice;
  observacion_cambio_puerto?: string;
  fecha_actualizacion_puerto?: string; // timestamp
  usuario_actualizacion_puerto?: number; // fk

  // AUDITORIA -------------------
  estado_auditoria?: EstadoAuditoriaOTInstallEnumChoice;
  motivo_correccion?: MotivoCorreccionOTAuditoriaEnumChoice;
  observacion_correccion?: string;

  ///* fk -------------------
  flota?: number;
  usuario_flota?: number; // gestiona - user de flota

  motivo_prerechazo?: number;

  linea_servicio?: number; // cliente
  solicitud_servicio?: number;
  preventa?: number;
  agendamiento?: number;

  nodo?: number;
  olt?: number;
  router?: number;
  pool_ipv4?: number;
  pool_ipv6?: number;

  // sales filters
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  solicitud_servicio_data?: SolicitudServicio;
  preventa_data?: Preventa;
  agendamiento_data?: Agendamiento;
  flota_data?: FlotaLimitData;
  linea_servicio_data?: LineaServicio;
  nodo_data?: Nodo;
  olt_data?: OLT;
  motivo_prerechazo_data?: MotivoRechazo;
  trazabilidad_data?: TrazabilidadVentas[]; // JSON
  brass_data?: Brass;

  // just serializer
  ciudad_data?: Ciudad;
  provincia_data?: ProvinciaLimitData;
  zona_data?: ZonaLimitData;
  sector_data?: SectorLimitData;
  nap_data?: Nap;

  can_be_managed?: boolean; // when oneAtTime filter is true
}

export type EquipoUtilizadosInstallOT = {
  codigo: string;
  cantidad: string;
  series: string[];
  producto_data: ProductDataLimitOT;
};
export type MaterialUtilizadosInstallOT = EquipoUtilizadosInstallOT & {};

export type ProductDataLimitOT = {
  nombre: string;
  codigo: string;
  tipo: string;

  modeloName?: string;
};

// helpers
export type OrdenTrabajoLimitData = Pick<
  OrdenTrabajo,
  | 'id'
  | 'uuid'
  | 'equipos_utilizados'
  | 'materiales_utilizados'
  | 'estado_orden_trabajo'
  | 'tipo_orden_trabajo'
  | 'numero_referencia'
  | 'codigo'
  | 'hora_inicio'
  | 'hora_fin'
  | 'hora_inicio_real'
  | 'estado_activacion'
  | 'ipv4'
  | 'ipv6'
  | 'pppoe'
  | 'pppassword'
  | 'luz_verde'
  | 'estado_auditoria'
  | 'motivo_correccion'
  | 'observacion_correccion'
  | 'flota'
  | 'linea_servicio'
  | 'solicitud_servicio'
  | 'preventa'
  | 'agendamiento'
  | 'nodo'
  | 'olt'
  | 'router'
  | 'pool_ipv4'
  | 'pool_ipv6'
  | 'area'
  | 'departamento'
  | 'canal_venta'
  | 'vendedor'
  | 'motivo_prerechazo'
>;
