import { Agendamiento, OrdenTrabajo } from '@/shared';

export type CreateInstalacionAsignadaOTOperaciones = Pick<
  OrdenTrabajo,
  'estado_orden_trabajo' | 'tipo_orden_trabajo' | 'agendamiento'
> &
  Pick<Agendamiento, 'flota' | 'estado_llamada' | 'observacion_llamada'> & {};
