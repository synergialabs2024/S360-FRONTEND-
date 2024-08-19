import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SolicitudServicio } from '../solicitud-servicio';

export interface PreventasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Preventa;
}

export interface Preventa {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  numero_referencia: string;
  codigo: string;

  es_referido: boolean;
  cliente_refiere: string;
  correo_cliente_refiere: string;
  // detalle_servicios: Detalle;
  // detalle_productos: Detalle;
  tipo_servicio: string;
  tipo_plan: string;
  numero_cuenta_bancaria: string;
  costo_instalacion: string;

  url_foto_cedula_frontal: string;
  url_foto_cedula_trasera: string;
  url_foto_documento_cuenta: string;

  ///* fk
  metodo_pago?: number;
  entidad_financiera?: number;
  solicitud_servicio?: number;

  // sales filter logic
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  solicitud_servicio_data?: SolicitudServicio;
}
