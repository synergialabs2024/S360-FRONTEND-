import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface NodosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Nodo[];
}

export interface Nodo {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;
  direccion: string;
  coordenadas: string;
  descripcion: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  pais: number;
  provincia: number;
  ciudad: number;
  zona: number;
  sector: number;
}

export type NodoLimitData = Pick<Nodo, 'id' | 'uuid' | 'name'>;
