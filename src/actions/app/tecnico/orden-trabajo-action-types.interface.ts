import { Agendamiento, OrdenTrabajo } from '@/shared';

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
> & {};
