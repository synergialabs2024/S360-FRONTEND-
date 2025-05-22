import { PagingMetaResponse } from '@/shared/interfaces/common';
import { EntidadFinanciera, MetodoPago } from '../administration';
import { Cliente, LineaServicio } from '../cliente';
import { Rubro } from './rubros.interface';
import { Saldo } from './saldo.interface';

export interface TransaccionesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Transaccion[];
}

export interface Transaccion {
  id: number;
  uuid: string;

  monto: string;

  ifi: string; // metodo de pago

  codigo_transaccion: string;
  numero_transaccion: string;

  created_at?: string;
  modified_at?: string;

  ///* fk ----------
  rubro?: number;
  saldo?: number;
  metodo_pago?: number;
  cliente?: number;
  linea_servicio?: number;

  // switch
  id_switch?: string;
  entidad_financiera?: string;

  rubro_data?: Rubro;
  rubros_data?: Rubro;
  cliente_data?: Cliente;
  linea_servicio_data?: LineaServicio;
  metodo_pago_data?: MetodoPago;
  saldo_data?: Saldo;
  entidad_financiera_data?: EntidadFinanciera;
}
