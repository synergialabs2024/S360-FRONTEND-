import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Departamento } from '../../administration';

export interface MantenedorActivacionBasePaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MantenedorActivacionBase[];
}

export interface MantenedorActivacionBase {
  id?: number;
  uuid?: string;
  state: string;
  code: string;
  tiempo_bloqueo: number;
  tiempo_limite: number;
  incluye_facturacion: boolean | string;
  incluye_notificacion: boolean | string;
  usuarios_autorizados: Departamento[];
  motivo: number;
  user_create: number;
}
