import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUserLimitData } from '../administration';
import { ContratoLimitData } from '../cliente';
import { Preventa } from '../comercial';

export interface SolicitudesAprobacionIAPreventaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudAprobacionIAPreventa[];
}

export interface SolicitudAprobacionIAPreventa {
  id?: number;
  uuid?: string;

  estado_solicitud: string;
  descripcion: string;

  created_at: string;
  modified_at: string;

  ///* fk
  preventa: number;
  vendedor: number;
  area: number;
  departamento: number;
  canal_venta: number;
  usuario_gestion: null;

  preventa_data: Preventa & {
    contrato_data: ContratoLimitData;
  };
  vendedor_data?: SystemUserLimitData;
}
