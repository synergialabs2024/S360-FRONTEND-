import type { ConfiguracionPlantillaCliente, PlanInternet } from '@/shared';
import type { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ContratosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Contrato[];
}

export interface Contrato {
  id?: number;
  uuid?: string;

  estado_contrato: string;
  url_contrato: string;
  numero_contrato: string;
  codigo: string;
  config_plantilla_cliente_json: ConfiguracionPlantillaCliente[];
  identificacion_pago: string;

  direccion: string; // sol servicio
  direccion_referencia: string; // sol servicio

  // profile classificator
  perfil_ingreso: string;
  perfil_actual: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  config_plantilla_cliente?: number;
  linea_servicio?: number;
  plan_internet_ingreso?: number;
  plan_internet_actual?: number;
  ciudad?: number;
  zona?: number;
  sector?: number;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  plan_internet_ingreso_data?: PlanInternet;
  plan_internet_actual_data?: PlanInternet;
  config_plantilla_cliente_data?: ConfiguracionPlantillaCliente;
}

export type ContratoLimitData = Pick<
  Contrato,
  | 'id'
  | 'uuid'
  | 'numero_contrato'
  | 'codigo'
  | 'estado_contrato'
  | 'direccion'
  | 'direccion_referencia'
>;
