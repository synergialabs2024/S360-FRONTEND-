import { SolicitudServicioLimitData } from '@/shared';
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
  solicitud_servicio_data?: SolicitudServicioLimitData;
}
