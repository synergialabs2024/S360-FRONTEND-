import { PagingMetaResponse } from '@/shared/interfaces/common';
import { OLT } from '../../infraestructura';

export interface autorizacionOnusPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: AutorizacionOnu[];
}

interface ont_contract {
  id?: number;
  uuid?: string;
  state?: boolean;
  sn?: string;
  description?: string;
}

interface ont_model {
  id?: number;
  uuid?: string;
  mode?: string;
  name?: string;
  image_url?: string;
}

export interface AutorizacionOnu {
  id?: number;
  uuid?: string;

  sn?: string;
  vendor_id?: string;
  software_version?: string;
  equipment_id?: string;
  authorized?: boolean;
  state?: boolean;

  created_at?: string;
  modified_at?: string;

  olt_port?: number;
  olt_slot?: number;
  olt_frame?: number;
  olt_name?: string;

  port_pon_id?: number;
  port_pon?: number;

  ont_model?: number;
  ont_contract?: number;

  /*---------------------Array---------------------*/
  olt_data?: OLT[];
  ont_contract_data?: ont_contract[];
  ont_model_data?: ont_model[];
  olt_id?: number[];

  /*----------------------------------------------*/
  alias_caja: string;
  userppoe: string;
  passppoe: string;
  nombre_cliente: string;
  cedula_cliente: string;

  vlans: string;
  line_profile: string;
  perfil_plan: string;
}

export type AutorizacionOnusLimitData = Pick<AutorizacionOnu, 'id' | 'uuid'>;
