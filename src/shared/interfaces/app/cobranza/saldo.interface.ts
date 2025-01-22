import { EstadoSaldoEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Cliente, LineaServicio } from '../cliente';
import { Rubro } from './rubros.interface';

export interface SaldosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Saldo[];
}

export interface Saldo {
  id?: number;
  uuid?: string;

  estado_saldo: EstadoSaldoEnumChoice;
  descripcion: string;

  monto: string;

  fecha_consumo?: string;

  created_at: string;
  modified_at: string;

  ///* fk
  rubro_origina?: number;
  rubro_consume?: number;
  cliente?: number;
  linea_servicio?: number;

  rubro_origina_data?: Rubro;
  rubro_consume_data?: Rubro;
  cliente_data?: Cliente;
  linea_servicio_data?: LineaServicio;
}
