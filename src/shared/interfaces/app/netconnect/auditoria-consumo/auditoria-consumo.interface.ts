export interface AuditoriaConsumo {
  // AuditoriaConsumo_Activos_Alto_Consumo
  id?: number;

  nombre?: string;
  contrato?: string;
  cedula?: string;
  estado?: string;
  mb_subida?: string;
  mb_descarga?: string;
  gb_subida?: string;
  gb_descarga?: string;

  // AuditoriaConsumo_Suspendidos_Consumo
  nodo?: string;
  ip_cliente?: string;

  //AuditoriaConsumo_Activos_Moroso
  comment?: string;
  list?: string;
  address?: string;
  creation_time?: string;
  ccr?: string;
  ip_ccr?: string;
  id_cliente?: string;
  router_sn?: string;
  ip?: string;
  pppuser?: string;
  ppppass?: string;
  plan?: string;

  // AuditoriaConsumo_Suspendidos_Consumo_MK
  sn?: string;
}
