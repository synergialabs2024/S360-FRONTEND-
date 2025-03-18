export interface Dashboard {
  clientes: Clientes;
  contratos: Contratos;
  lineas_servicio: LineasServicio;
  rubros: Rubros;
  transacciones: Transacciones;
  saldos: Saldos;
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
}

interface Rubros {
  total: number;
  pagados: number;
  no_pagados: number;
  monto_no_pagado: number;
}

interface Transacciones {
  total: number;
  monto_total: number;
}

interface Saldos {
  monto_total: number;
}
