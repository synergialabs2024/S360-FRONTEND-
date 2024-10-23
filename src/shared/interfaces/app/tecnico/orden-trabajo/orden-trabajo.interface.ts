export interface OrdenTrabajo {
  estado_orden_trabajo: string; // choice
  tipo_orden_trabajo: string; // choice

  numero_referencia?: string;
  codigo?: string;

  hora_inicio: string; // timestamp
  hora_fin: string; // timestamp

  // INVENTARIO -------------------
  materiales_utilizados: string;
  equipos_utilizados: string;

  punta_inicial_fibra: string;
  punta_final_fibra: string;
  metraje_utilizado_fibra: string;
  metraje_exedente_fibra: string;
  serie_ont: string;
  potencia_ont: string;

  url_foto_ont: string;
  url_foto_potencia_ont: string;
  url_foto_ont_encontrado_casa: string;
  url_foto_etiqueta: string;
  url_foto_nap: string;
  url_foto_potencia_nap: string;
  url_foto_premio: string;
  url_foto_test_speed: string;
  url_foto_acta_entrega_ups: string;

  // ACTIVACION -------------------
  estado_activacion: string;
  ipv4: string;
  ipv6: string;
  pppoe: string;
  pppassword: string;

  observacion_prerechazo: string;

  ///* fk
  flota: number; // gestiona - user de flota

  motivo_prerechazo: number;

  linea_servicio: number; // cliente
  solicitud_servicio: number;
  preventa: number;
  agendamiento: number;

  nodo: number;
  olt: number;
  router: number;
  pool_ipv4: number;
  pool_ipv6: number;

  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;
}
