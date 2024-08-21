import { PagingMetaResponse, PuertoType } from '@/shared/interfaces/common';

export interface NapsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Nap;
}

export interface Nap {
  id?: number;
  uuid?: string;
  state: boolean;

  name: string;
  direccion: string;
  coordenadas: string;
  puertos: PuertoType[];
  es_soterrado: boolean;
  status_nap: string;
  proyecto_cod: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  nodo: number;
  olt: number;
  ciudad: number;
  sector: number;
}
