import { DeudaCuotaEquipoVentaEstadoEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface DeudaCuotaEquipoVentaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: DeudaCuotaEquipoVenta[];
}

export interface DeudaCuotaEquipoVenta {
  id?: number;
  uuid?: string;

  estado_cuota: DeudaCuotaEquipoVentaEstadoEnumChoice;
  monto_cuota: string;
  subtotal_cuota: string;
  taxes_cuota: string;
  fecha_vencimiento: string;

  cuota_actual: number;
  plan_pago_cuota: number;
  rubro: number;

  created_at?: string;
  modified_at?: string;
}

export type DeudaCuotaEquipoVentaLimitData = Pick<
  DeudaCuotaEquipoVenta,
  'uuid' | 'estado_cuota' | 'id'
>;
