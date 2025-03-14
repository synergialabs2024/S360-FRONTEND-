import { PagingMetaResponse } from '@/shared/interfaces/common';
import { PrioridadTMEnumChoice } from '@/shared/constants';

export interface IncidenciaTMPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: IncidenciaTM[];
}

export interface IncidenciaTM {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  prioridad: PrioridadTMEnumChoice;
  restringir_asuntos_ticket: boolean;
  user_create?: number;
  asuntos_ticket: string[];

  created_at?: string;
  modified_at?: string;
}

export type IncidenciaTMLimitData = Pick<IncidenciaTM, 'id' | 'uuid'>;
