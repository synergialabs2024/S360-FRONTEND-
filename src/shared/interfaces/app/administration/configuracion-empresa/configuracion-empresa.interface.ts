import { PagingMetaResponse } from '@/shared/interfaces/common';
import { YesNoEnumChoice } from '@/shared/constants';

export interface ConfiguracionEmpresasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ConfiguracionEmpresa[];
}

export interface ConfiguracionEmpresa {
  id?: number;
  uuid?: string;

  schema_name: string;
  company_name: string;
  commercial_name: string;
  main_address: string;
  establishment_address: string;
  establishment_code: string;
  issuing_point_code: string;
  special_taxpayer: string;
  obligated_accounting: YesNoEnumChoice;
  logo_1_url: string;
  logo_2_url: string;
  mobile: string;
  phone: string;

  email: string;
  website: string;
  description: string;
  url_oficina_virtual_aceptacion: string;
  url_imagen_email_aceptar_contrato: string;
  url_oficina_virtual_activacion: string;

  parroquia_name_contrato: string;
  provincia_name_contrato: string;
  ciudad_name_contrato: string;
  canton_name_contrato: string;

  created_at?: string;
  modified_at?: string;
}

export type ConfiguracionEmpresaLimitData = Pick<
  ConfiguracionEmpresa,
  'uuid' | 'company_name'
>;
