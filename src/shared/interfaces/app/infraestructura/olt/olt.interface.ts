import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface OltsPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: OLT[];
}

export interface OLT {
  id?: number;
  uuid?: string;

  state: boolean;

  name: string;
  direccion: string;
  coordenadas: string;
  descripcion: string;

  puerto: string;
  hostname: string;
  password: string;
  user: string;
  pppoe: string;
  ip_pppoe: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  nodo?: number;
  pais?: number;
  provincia?: number;
  ciudad?: number;
  zona?: number;
  sector?: number;
}

export type OLTLimitData = Pick<OLT, 'id' | 'uuid' | 'name'>;
