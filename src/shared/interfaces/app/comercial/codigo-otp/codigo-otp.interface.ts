import {
  SolicitudServicioLimitData,
  SystemUserLimitData,
  TrazabilidadVentas,
} from '@/shared';
import { OtpStatesEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CodigosOtpPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CodigoOtp[];
}

export interface CodigoOtp {
  id?: number;
  uuid?: string;

  celular: string;
  codigo_otp: string;
  estado_otp: OtpStatesEnumChoice;
  available_until: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  // only serializer
  solicitud_servicio_data?: SolicitudServicioLimitData[];
  trazabilidad_data?: TrazabilidadVentas[];
  vendedor_data?: SystemUserLimitData;
  gestionado_by_data?: SystemUserLimitData;
}

export type CodigoOtpLimitData = Pick<
  CodigoOtp,
  'id' | 'uuid' | 'celular' | 'codigo_otp' | 'estado_otp' | 'available_until'
>;
