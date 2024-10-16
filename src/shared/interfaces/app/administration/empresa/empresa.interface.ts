import { PagingMetaResponse } from '@/shared/interfaces/common';
import { CiudadLimitData } from '../ciudad';
import { PaisLimitData } from '../pais';
import { ProvinciaLimitData } from '../provincia';

export interface EmpresasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Empresa[];
}

export interface Empresa {
  id?: number;
  uuid?: string;

  tipo_identificacion: string; // choice
  identificacion: string;
  razon_social: string;
  commercial_name: string;
  email: string;
  address: string;
  phone_1: string;
  phone_2: string;
  phone_3: string;
  logo_url: string;
  is_agente_retencion: boolean;
  number_agente_retencion: number;
  razon_social_representante: string;
  identificacion_representante: string;
  email_representante: string;
  phone_representante: string;
  contador: string;
  genera_ats: boolean;

  state: boolean;
  created_at?: string;
  modified_at?: string;

  ///* fk
  pais?: number;
  provincia?: number;
  ciudad?: number;

  pais_data?: PaisLimitData;
  provincia_data?: ProvinciaLimitData;
  ciudad_data?: CiudadLimitData;
}

export type EmpresaLimitData = Pick<
  Empresa,
  'uuid' | 'razon_social' | 'commercial_name'
>;
