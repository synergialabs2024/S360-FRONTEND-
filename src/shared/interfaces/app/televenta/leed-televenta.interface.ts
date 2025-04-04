import {
  IdentificationTypeEnumChoice,
  LeedTeleventa_Estado_TMEnumChoice,
  LeedTeleventa_Origen_TMEnumChoice,
} from '@/shared/constants';
import { PlanInternet } from '../servicios';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Area, CanalVenta, Departamento, SystemUser } from '../administration';

export interface LeedTeleventaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: LeedTeleventa[];
}

export interface LeedTeleventa {
  id?: number;
  uuid?: string;

  origen_leed: LeedTeleventa_Origen_TMEnumChoice;
  estado_leed: LeedTeleventa_Estado_TMEnumChoice;
  tipo_identificacion: IdentificationTypeEnumChoice;
  identificacion: string;
  razon_social: string;
  celular: string;

  celular_adicional?: string;
  email?: string;
  direccion_referencia?: string;
  coordenadas?: string;
  motivo_rechazo_libre?: string;

  plan_internet: number;
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  plan_internet_data: PlanInternet;
  area_data: Area;
  departamento_data: Departamento;
  canal_venta_data: CanalVenta;
  vendedor_data: SystemUser;

  created_at?: string;
  modified_at?: string;
}

export type LeedTeleventaLimitData = Pick<LeedTeleventa, 'id' | 'uuid'>;
