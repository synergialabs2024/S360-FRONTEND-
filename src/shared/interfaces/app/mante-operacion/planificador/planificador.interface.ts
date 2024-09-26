import { SlotAgendamientoEstadosEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { FlotaLimitData } from '../flota';

export interface PlanificadorPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Planificador[];
}

export interface Planificador {
  id?: number;
  uuid?: string;

  fecha: string; // YYYY-MM-DD
  time_map?: TimeMapPlanificador[];

  created_at?: string;
  modified_at?: string;

  ///* fk
  flota?: number;

  flota_data?: FlotaLimitData;
}

export interface TimeMapPlanificador {
  uuid: string;
  hora: string; // HH:MM:SS

  estado?: SlotAgendamientoEstadosEnumChoice | null;
  motivo?: string | null;

  preventa?: number;
  user?: number;
  block_until?: string | null; // timestamp
}
