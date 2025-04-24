import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUserLimitData } from '../../administration';
import { Cliente } from '../../cliente';
import { PlanInternet } from '../../servicios';

export interface EncuestaAsesoresPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: EncuestaAsesores[];
}

export interface EncuestaAsesores {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;

  cliente: Cliente;
  primera_pregunta: string;
  segunda_pregunta: string;
  primera_pregunta_resp: string;
  segunda_pregunta_resp: string;

  asesor: SystemUserLimitData;

  plan_internet_data: PlanInternet;

  // fecha instalacion
  // nodo
}
