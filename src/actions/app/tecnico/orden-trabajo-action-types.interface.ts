import { Agendamiento, OrdenTrabajo, Preventa } from '@/shared';

export type CreateInstalacionAsignadaOTOperaciones = Pick<
  OrdenTrabajo,
  'estado_orden_trabajo' | 'tipo_orden_trabajo' | 'agendamiento'
> &
  Pick<
    Agendamiento,
    'flota'
    // | 'estado_llamada' | 'observacion_llamada'
  > & {};

///* ACTIVACION ===================================
export type ActivateInstalacionOTData = Pick<
  OrdenTrabajo,
  'serie_ont' | 'hora_inicio' | 'hora_fin' | 'observacion_activacion'
> & {
  producto: number;
};

///* INSTALACIONES - TECNICO ===================================
export type UploadInstalacionOTAsignData = Pick<
  OrdenTrabajo,
  | 'equipos_utilizados'
  | 'materiales_utilizados'
  | 'punta_inicial_fibra'
  | 'punta_final_fibra'
  | 'metraje_utilizado_fibra'
  | 'metraje_exedente_fibra'
  | 'serie_ont'
  | 'potencia_ont'
  | 'observaciones_adicionales'
  | 'url_foto_ont'
  | 'url_foto_potencia_ont'
  | 'url_foto_etiqueta'
  | 'url_foto_nap'
  | 'url_foto_potencia_nap'
  | 'url_foto_test_speed'
  // | 'url_foto_ont_encontrado_casa'
  // | 'url_foto_premio'
  // | 'url_foto_acta_entrega_ups'
> &
  Pick<Preventa, 'nap' | 'puerto_nap' | 'distancia_nap'> & {
    url_foto_ont_encontrado_casa?: string;
    url_foto_acta_entrega_ups?: string;
    url_foto_premio?: string;
  };

export type RejectInstalacionOTData = Pick<
  OrdenTrabajo,
  'observacion_prerechazo' | 'motivo_prerechazo'
>;
