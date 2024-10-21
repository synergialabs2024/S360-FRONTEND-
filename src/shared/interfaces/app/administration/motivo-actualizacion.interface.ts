import { MotivoActualizacionModuloEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MotivosActualizacionPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoActualizacion[];
}

export interface MotivoActualizacion {
  id?: number;
  uuid?: string;

  name: string;
  description: string;
  state: boolean;
  modulo: MotivoActualizacionModuloEnumChoice;

  created_at?: string;
  modified_at?: string;
}
