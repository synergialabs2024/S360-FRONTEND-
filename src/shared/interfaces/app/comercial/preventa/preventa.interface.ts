import {
  EstadoPreventaEnumChoice,
  ReferidoTypeEnumChoice,
  TipoCuentaBancariaEnumChoice,
} from '@/shared/constants';
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

  estado_preventa: EstadoPreventaEnumChoice;
  numero_referencia: string;
  codigo: string;

  nombre_persona_referencia: string;
  celular_adicional: string;
  parentesco_referencia: string;

  // sistema referido
  tipo_referido?: ReferidoTypeEnumChoice;
  es_referido?: boolean;
  cliente_refiere?: number; // fk
  correo_cliente_refiere?: string;
  flota_refiere?: number; // fk
  // detalle_servicios: Detalle;
  // detalle_productos: Detalle;

  tipo_servicio: string;
  tipo_plan: string;

  numero_cuenta_bancaria: string;
  costo_instalacion: string;

  url_foto_cedula_frontal: string;
  url_foto_cedula_trasera: string;
  url_foto_documento_cuenta: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  metodo_pago?: number;
  entidad_financiera?: number;
  tipo_cuenta_bancaria?: TipoCuentaBancariaEnumChoice;
  solicitud_servicio?: number;
  tarjeta?: number;

  // sales filter logic
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  solicitud_servicio_data?: SolicitudServicio;
}
