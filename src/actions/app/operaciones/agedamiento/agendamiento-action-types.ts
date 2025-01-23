import { Agendamiento, FlotaLimitData } from '@/shared';

///* CACHE - Install schedule --------------------
export type InstallScheduleCacheData = {
  selectedHour: string; // HH:MM:SS
  selectedDate: string; // YYYY-MM-DD

  limitDate: string; // timestamp - 10 mins - timer

  userId: number;
  preventaId: number;
  flotaId: number;

  selectedHourUUID?: string;

  // helpers
  rawFlota?: FlotaLimitData;
  flotaUUID?: string;
} | null;

export enum CacheBaseKeysPreventaEnum {
  HORARIO_INSTALACION_AGENDA_VENTAS = 'horario_instalacion_agenda_ventas',
  HORARIO_INSTALACION_AGENDA_OPERACIONES = 'horario_instalacion_agenda_operaciones',
  HORARIO_INSTALACION_AGENDA_RECOORDINACION = 'horario_instalacion_agenda_recoordinacion',
}

export enum CacheBaseKeysPreventaEnum {
  HORARIO_VISITA_AGENDA_VENTAS = 'horario_visita_agenda_ventas',
  HORARIO_VISITA_AGENDA_OPERACIONES = 'horario_visita_agenda_operaciones',
  HORARIO_VISITA_AGENDA_RECOORDINACION = 'horario_visita_agenda_recoordinacion',
}

export const COUNTDOWN_AGENDA_VENTAS_ID = 'agendamientoVentasCountdown';

export const COUNTDOWN_TICKETS_VISITAS_ID =
  'agendamientoTicketsVisitasCountdown';

///* form --------------------
export type CreateAgendamientoVentasFormData = Pick<
  Agendamiento,
  | 'hora_instalacion'
  | 'fecha_instalacion'
  | 'fecha_instalacion'
  | 'flota'
  | 'preventa'
  // | 'estado_llamada'
  // | 'observacion_llamada'
> & {};

export type RequestUpdateAgendamientoOpe = Pick<
  Agendamiento,
  'estado_agendamiento' | 'motivo_actualizacion' | 'observacion_actualizacion'
> & {};

export type RecoordinarAgendaData = Pick<
  Agendamiento,
  'flota' | 'nap' | 'fecha_instalacion' | 'hora_instalacion'
> & {
  solicitud_recoordinacion: string; // UUID
};
