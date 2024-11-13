import type { IdentificationTypeEnumChoice } from '@/shared/constants';
import type { PagingMetaResponse } from '@/shared/interfaces/common';
import type { LineaServicio } from '../';

export interface ClientesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Cliente[];
}

export interface Cliente {
  id?: number;
  uuid?: string;

  tipo_identificacion: IdentificationTypeEnumChoice;
  identificacion: string;
  razon_social: string;
  celular: string;
  email: string;

  es_tercera_edad: boolean;
  es_discapacitado: boolean;
  is_installed: boolean;

  created_at?: string;
  modified_at?: string;

  ///* fk
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;

  linea_servicio_data?: LineaServicio[];
}

export type ClienteLimitData = Pick<
  Cliente,
  | 'uuid'
  | 'razon_social'
  | 'email'
  | 'celular'
  | 'tipo_identificacion'
  | 'identificacion'
>;
