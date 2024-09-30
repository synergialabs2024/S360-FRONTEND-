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
  flotaName?: string;
} | null;

export enum CacheBaseKeysPreventaEnum {
  HORARIO_INSTALACION_AGENDA_VENTAS = 'horario_instalacion_agenda_ventas',
  HORARIO_INSTALACION_AGENDA_OPERACIONES = 'horario_instalacion_agenda_operaciones',
}

export const COUNTDOWN_AGENDA_VENTAS_ID = 'agendamientoVentasCountdown';
