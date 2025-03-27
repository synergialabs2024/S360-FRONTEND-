import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface DashboardPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Dashboard;
}

export interface Dashboard {
  clientes: Clientes;
  contratos: Contratos;
  lineas_servicio: LineasServicio;
  rubros: Rubros;
  transacciones: Transacciones;
  saldos: Saldos;
  start_date?: string;
  end_date?: string;
}

interface Clientes {
  total: number;
}

interface Contratos {
  total: number;
}

interface LineasServicio {
  total: number;
  activas: number;
  suspendidas: number;
  retiradas: number;
}

interface Rubros {
  total: number;
  pagados: number;
  no_pagados: number;
  anulados: number;
  monto_no_pagado: number;
}

interface Transacciones {
  total: number;
  monto_total: number;
}

interface Saldos {
  monto_total: number;
}
