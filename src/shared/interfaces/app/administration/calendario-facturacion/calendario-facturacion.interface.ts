import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CalendarioFacturacionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CalendarioFacturacion[];
}

export interface CalendarioFacturacion {
  id?: number;
  uuid?: string;

  state: boolean;
  aplica_nuevo: boolean;

  dia_inicio: number;
  dia_fin: number;
  dia_pago: number;
  dias_gracia: number;
  dia_maximo_pago: number;
  dia_suspension: number;
  dia_facturacion: number;
}

export type CalendarioFacturacionLimitData = Pick<
  CalendarioFacturacion,
  'uuid'
>;
