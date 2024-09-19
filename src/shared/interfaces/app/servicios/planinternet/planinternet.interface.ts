import { ClasificacionPlanesScoreBuroEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface PlanesInternetPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: PlanInternet[];
}

export interface PlanInternet {
  id?: number;
  uuid?: string;

  name: string;
  description: string;
  valor: string;
  velocidad_descarga_minima: string;
  velocidad_descarga_maxima: string;
  velocidad_subida_minima: string;
  velocidad_subida_maxima: string;
  comparticion: string;
  prioridad: number;

  created_at?: string;
  modified_at?: string;
  state: boolean;

  unidad_velocidad: string;
  permanencia: string;
  tipo_servicio: string;
  tipo_plan: string;
  clasificacion_score_buro: ClasificacionPlanesScoreBuroEnumChoice | string;
}

export type PlanInternetLimitData = Pick<PlanInternet, 'uuid' | 'name' | 'id'>;
