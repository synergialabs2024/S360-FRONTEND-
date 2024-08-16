import { PagingMetaResponse } from '@/shared/interfaces/common';

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

  linea_servicio: number;
  coordenadas: string; // to get factibilidad directly
  tiene_cobertura: boolean;

  // detalle si ya es cliente x linea (plan, estado actual cliente, etc.)
  detalle_servicios_contratados?: string; // JSON

  block_until?: string; // timestamp

  // EQUIFAX
  categoria_score_desicion: string;
  valor_maximo: string;
  valor_minimo: string;
  score_inclusion: string;
  score_sobreendeudamiento: string;
  score_servicios: string;
  rango_capacidad_pago: string;

  created_at?: string;
  modified_at?: string;

  ///* fk -----------
  plan_sugerido?: number;
  pais?: number;
  nacionalidad?: string; // pais can cupd

  // sales filter logic
  empresa?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;
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
