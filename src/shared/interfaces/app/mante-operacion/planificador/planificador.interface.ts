import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PlanificadorPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Planificador[];
}

export interface Planificador {
  id: number;
  uuid: string;

  fecha: string; // YYYY-MM-DD

  created_at: string;
  modified_at: string;
  time_map: TimeMap[];

  ///* fk
  flota: number;
}

export interface TimeMap {
  hora: string;
  user: number;
  uuid: string;

  estado: string;

  preventa: number;
  block_until: string;
}
