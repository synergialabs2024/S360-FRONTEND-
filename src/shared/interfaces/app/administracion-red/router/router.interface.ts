import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface RoutersPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Router[];
}

export interface Router {
  id?: number;
  uuid?: string;

  state: boolean;
  name: string;
  ip: string;
  username: string;
  password: string;
  usuario_api: string;
  puerto_api: number;
  clave_api: string;
  direccion: string;
  coordenadas: string;

  created_at?: string;
  modified_at?: string;

  tipo_router: string;

  tiene_grupo_ipv4: boolean;
  tiene_grupo_ipv6: boolean;
  grupo_ipv4?: number;
  grupo_ipv6?: number;

  ///* fk
  nodo?: number;
  olt?: number;
  pais?: number;
  provincia?: number;
  ciudad?: number;
  zona?: number;
  sector?: number;
}
