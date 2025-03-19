import { EstadoDevolucionEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ClientePendienteDevolucionPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ClientePendienteDevolucion[];
}

export interface ClientePendienteDevolucion {
  id?: number;
  uuid?: string;

  numero_referencia: string;
  estado_devolucion: EstadoDevolucionEnumChoice;
  total: string;

  linea_servicio: number;
  factura: number;
  preventa: number;
  cliente: number;
  contrato: number;
  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;
  rubros_asociados: number[];

  created_at?: string;
  modified_at?: string;
}
