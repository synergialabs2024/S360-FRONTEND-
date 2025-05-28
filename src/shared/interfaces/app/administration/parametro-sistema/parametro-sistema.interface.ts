import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ParametrosSistemasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ParametroSistema[];
}
export interface ParametrosSistemasFacturacionPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ParametroSistemaFacturacion[];
}

export interface ParametroSistema {
  id?: number;
  uuid?: string;
  name: string;
  slug: string; // SystemParamsSlugsEnum
  value: string;
  description: string;
  type: string;

  state: boolean;
  created_at?: string;
  modified_at?: string;
}

export interface ParametroSistemaFacturacion {
  id?: number;
  uuid?: string;

  SECUENCIAL_FACTURA: string;
  FIRMA_URL: string;
  FIRMA_CLAVE: string;
  RUC_EMPRESA: string;
  RAZON_SOCIAL: string;
  NOMBRE_COMERCIAL: string;
  DIRECCION_MATRIZ: string;
  ESTABLECIMIENTO: string;
  PUNTO_EMISION: string;
  AMBIENTE_SRI: string;
  OBLIGADO_CONTABILIDAD: string;
  CONTRIBUYENTE_ESPECIAL: string;
  DIRECCION_ESTABLECIMIENTO: string;
  REGIMEN_MICROEMPRESAS: string;

  created_at?: string;
  modified_at?: string;
}

export type ParametroSistemaLimitData = Pick<ParametroSistema, 'name' | 'uuid'>;
