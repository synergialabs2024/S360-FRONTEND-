import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface EncuestaPlantillasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: EncuestaPlantillas[];
}

export interface EncuestaPlantillas {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;

  name: string;
  state: boolean;
  slug: string;
  description: string;
  questions: Questions[];
}

export interface Questions {
  id: string;
  text: string;
  type: string;
}
