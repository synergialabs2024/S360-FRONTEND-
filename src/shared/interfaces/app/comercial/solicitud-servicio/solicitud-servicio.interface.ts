import { Ciudad, CodigoOtpLimitData, Provincia, Sector, Zona } from '@/shared';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { TrazabilidadVentas } from '../trazabilidad';

export interface SolicitudServiciosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudServicio[];
}

export interface SolicitudServicio {
  id?: number;
  uuid?: string;

  estado_solicitud: string; // EstadoSolicitudServicioEnumChoice

  numero_referencia: string;
  codigo: string;

  tipo_identificacion: string;
  identificacion: string;
  razon_social: string;
  email: string;
  celular: string;
  direccion: string;
  es_discapacitado: boolean;
  es_tercera_edad: boolean;
  es_cliente: boolean;
  fecha_nacimiento: string;
  edad: number;

  coordenadas: string; // to get factibilidad directly
  tiene_cobertura: boolean;

  // detalle si ya es cliente x linea (plan, estado actual cliente, etc.)
  detalle_servicios_contratados?: string; // JSON

  block_until?: string; // timestamp

  created_at?: string;
  modified_at?: string;

  ///* fk -----------
  pais?: number;
  nacionalidad?: string; // pais can upd

  codigo_otp?: number;

  provincia?: number;
  ciudad?: number;
  zona?: number; // calc based on coords
  sector?: number; // select

  linea_servicio?: number; // fk

  // sales filter logic
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  trazabilidad_data?: TrazabilidadVentas[]; // JSON
  codigo_otp_data?: CodigoOtpLimitData;
  codigos_otp_data?: CodigoOtpLimitData[];

  sector_data?: Sector;
  zona_data?: Zona;
  ciudad_data?: Ciudad;
  provincia_data?: Provincia;
}

export type SolicitudServicioLimitData = Pick<
  SolicitudServicio,
  | 'uuid'
  | 'numero_referencia'
  | 'codigo'
  | 'estado_solicitud'
  | 'created_at'

  // prospecto
  | 'identificacion'
  | 'razon_social'
>;
