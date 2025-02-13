import { EquipoVentasDetalle } from '@/app/comercial/preventa/shared/components';
import { Flota, PromocionLimitData, TrazabilidadVentas } from '@/shared';
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
import { NapLimitData } from '../../infraestructura';
import { PlanInternet } from '../../servicios';
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

  costo_instalacion: string;

  numero_tarjeta_credito?: string; // credito
  url_foto_tarjeta?: string; // credito
  titular_tarjeta?: string;
  fecha_vencimiento_tarjeta?: string;

  url_foto_cedula_frontal: string;
  url_foto_cedula_trasera: string;
  url_foto_documento_cuenta?: string;
  url_foto_vivienda: string;
  url_foto_planilla: string; // 3ra edad

  url_foto_cedula_frontal_corregida: string;
  url_foto_aceptacion_corregida: string;

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
  url_aceptacion?: string; // url oficina virtual
  requiere_correccion_aceptacion: boolean;

  fecha_aceptacion?: string;
  fecha_limite_validacion_aceptacion?: string;

  created_at?: string;
  modified_at?: string;

  // fallido
  motivo_rechazo?: number; // fk
  observacion_cancelacion?: string;

  // equifax --------------
  rango_capacidad_pago: string;
  score_servicios: string;
  score_sobreendeudamiento: string;
  plan_sugerido_buro: string; // ClasificacionPlanesScoreBuroEnumChoice,
  planes_sugeridos_buro?: ClasificacionPlanesScoreBuroEnumChoice[];
  plan_internet?: number;

  requiere_pago_previo: boolean;
  estado_pago?: EstadoPagoEnumChoice;

  // equipos venta --------------------
  equipos_venta_detalle: EquipoVentasDetalle[];

  numero_cuenta_bancaria?: string; // debito

  ///* fk
  metodo_pago?: number;
  entidad_financiera?: number; // debito
  tipo_cuenta_bancaria?: TipoCuentaBancariaEnumChoice; // debito
  solicitud_servicio?: number;

  tarjeta?: number; // credito

  promociones?: number[]; // fk
  promocion_items_selected?: PreventaPromocionSelectedOptions[];

  // sales filter logic
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  //
  trazabilidad_data?: TrazabilidadVentas[]; // JSON

  solicitud_servicio_data?: SolicitudServicio;
  plan_internet_data?: PlanInternet;
  metodo_pago_data?: MetodoPago;
  entidad_financiera_data?: EntidadFinanciera;
  tarjeta_data?: Tarjeta;
  nap_data?: NapLimitData;
  flota_data?: Flota;
  promociones_data?: PromocionLimitData[];

  // helpers properties
  can_be_scheduled?: boolean;
  es_tercera_edad?: boolean; // <- sol_service
}

export type PreventaPromocionSelectedOptions = {
  codigo: string;
  nombre: string;
  selected_item_uuid: string;
  promocion_uuid: string;
};
