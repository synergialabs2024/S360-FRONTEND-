import { PagingMetaResponse } from '@/shared/interfaces/common';

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
  time_map?: TimeMap[];

  created_at?: string;
  modified_at?: string;

  ///* fk
  flota?: number;
}

export interface TimeMap {
  uuid: string;
  hora: string; // HH:MM:SS

  estado?: string | null;

  preventa?: number;
  user?: number;
  block_until?: string | null;
}
