import {
  ClasificacionPlanesScoreBuroEnumChoice,
  EstadoPagoEnumChoice,
  EstadoPreventaEnumChoice,
  EstadoValidacionAceptacionEnumChoice,
  InternetPlanInternetTypeEnumChoice,
  InternetServiceTypeEnumChoice,
  ReferidoTypeEnumChoice,
  TipoCuentaBancariaEnumChoice,
} from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { EntidadFinanciera, MetodoPago } from '../../administration';
import { Tarjeta } from '../../cobranza';
import { PlanInternetLimitData } from '../../servicios';
import { SolicitudServicio } from '../solicitud-servicio';
import { Nap } from '../../infraestructura';

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

  // sistema referido --------------
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

  // // factibilidad ------
  flota?: number; // fk
  nap?: number; // fk
  distancia_nap: number;
  puerto_nap?: number;

  // // oficina virtual - aceptacion contrato ------
  url_foto_aceptacion?: string; // oficina virtual
  contrato_aceptado: boolean;
  // x eventualidad en validacion faces oficina virtual
  estado_validacion_aceptacion?: EstadoValidacionAceptacionEnumChoice;
  fecha_validacion_aceptacion?: string;

  created_at?: string;
  modified_at?: string;

  // equifax --------------
  rango_capacidad_pago: string;
  score_servicios: string;
  score_sobreendeudamiento: string;
  plan_sugerido_buro: string; // ClasificacionPlanesScoreBuroEnumChoice,
  planes_sugeridos_buro?: ClasificacionPlanesScoreBuroEnumChoice[];
  plan_internet?: number;

  requiere_pago_previo: boolean;
  estado_pago?: EstadoPagoEnumChoice;

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
  plan_internet_data?: PlanInternetLimitData;
  metodo_pago_data?: MetodoPago;
  entidad_financiera_data?: EntidadFinanciera;
  tarjeta_data?: Tarjeta;
  nap_data?: Nap;
}
