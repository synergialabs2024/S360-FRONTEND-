import type { PagingMetaResponse } from '@/shared/interfaces/common';
import { ClienteLimitData } from '../cliente.interface';

export interface FindByIdentificationRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  data: FindByIdentification;
}

export interface FindByIdentification {
  id?: number;
  uuid?: string;

  cliente_data?: ClienteLimitData;
  contrato_data: ContratoData;
  solicitud_servicio_data: SolicitudServicioData;
  nap_data: NapData;
  zona_data: ZonaData;

  celular_adicional: string;
  created_at: string;
  modified_at: string;
  linea_numero: number;
  estado_linea: string;
  cliente: number;
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;
}

export interface NapData {
  id: number;
  uuid: string;
  state: boolean;
  name: string;
  coordenadas: string;
  es_soterrado: boolean;
  status_nap: string;
  proyecto_cod: string;
}

export interface ZonaData {
  name: string;
  uuid: string;
  id: number;
}

export interface ContratoData {
  id: number;
  uuid: string;
  estado_contrato: string;
  numero_contrato: string;
  codigo: string;
  direccion: string;
  identificacion_pago: string;
  direccion_referencia: string;
}

export interface ContratoData {
  id: number;
  uuid: string;
  estado_contrato: string;
  numero_contrato: string;
  codigo: string;
  direccion: string;
  identificacion_pago: string;
}

export interface SolicitudServicioData {
  id: number;
  direccion_referencia: string;
  created_at: string;
  modified_at: string;
  uuid: string;
  tipo_identificacion: string;
  identificacion: string;
  razon_social: string;
  celular: string;
  email: string;
  direccion: string;
  fecha_nacimiento: string;
  edad: number;
  es_discapacitado: boolean;
  es_tercera_edad: boolean;
  es_cliente: boolean;
  nacionalidad: string;
  numero_referencia: string;
  codigo: string;
  detalle_servicios_contratados?: null;
  coordenadas: string;
  tiene_cobertura: boolean;
  estado_solicitud: string;
  block_until: string;
  observacion_cancelacion?: null;
  pais: number;
  provincia: number;
  ciudad: number;
  zona: number;
  sector: number;
  motivo_rechazo?: null;
  linea_servicio: number;
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;
}
