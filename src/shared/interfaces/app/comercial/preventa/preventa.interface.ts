import {
  ClasificacionPlanesScoreBuroEnumChoice,
  EstadoPreventaEnumChoice,
  InternetPlanInternetTypeEnumChoice,
  InternetServiceTypeEnumChoice,
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

  tipo_servicio: InternetServiceTypeEnumChoice;
  tipo_plan: InternetPlanInternetTypeEnumChoice;

  numero_cuenta_bancaria?: string; // debito
  costo_instalacion: string;
  numero_tarjeta_credito?: string; // credito

  url_foto_cedula_frontal: string;
  url_foto_cedula_trasera: string;
  url_foto_documento_cuenta?: string;
  url_foto_vivienda: string;
  // url_foto_planilla?: string; // unlock req is available

  url_foto_tarjeta?: string; // credito

  url_foto_aceptacion?: string; // oficina virtual

  created_at?: string;
  modified_at?: string;

  // equifax --------------
  rango_capacidad_pago: string;
  score_servicios: string;
  score_sobreendeudamiento: string;
  plan_sugerido_buro: string; // ClasificacionPlanesScoreBuroEnumChoice,
  planes_sugeridos_buro?: ClasificacionPlanesScoreBuroEnumChoice[];
  plan_internet?: number;

  ///* fk
  metodo_pago?: number;
  entidad_financiera?: number; // debito
  tipo_cuenta_bancaria?: TipoCuentaBancariaEnumChoice; // debito
  solicitud_servicio?: number;
  tarjeta?: number; // credito

  // sales filter logic
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  solicitud_servicio_data?: SolicitudServicio;
}
