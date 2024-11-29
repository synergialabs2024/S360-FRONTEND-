import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface BrassPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Brass[];
}

export interface Brass {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  ip: string;
  username: string;
  password: string;
  direccion: string;
  coordenadas: string;

  // fk
  pais: number;
  provincia: number;
  ciudad: number;

  created_at?: string;
  modified_at?: string;
}

export type BrasLimitData = Pick<Brass, 'id' | 'uuid'>;
