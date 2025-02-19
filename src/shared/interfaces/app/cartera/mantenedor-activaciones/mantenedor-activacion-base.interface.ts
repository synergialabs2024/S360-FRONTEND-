import { PagingMetaResponse } from '@/shared/interfaces/common';
import { Departamento } from '../../administration';
import { MotivoRubroAdicional } from '../../cobranza';

export interface MantenedorActivacionBasePaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MantenedorActivacionBase[];
}

export interface MantenedorActivacionBase {
  id?: number;
  uuid?: string;
  motivo_base: string;
  motivo_data: MotivoRubroAdicional;
  state: string;
  code: string;
  tiempo_bloqueo: number;
  tiempo_limite: number;
  incluye_facturacion: boolean;
  incluye_notificacion: boolean;
  usuarios_autorizados: Departamento[];
  motivo: number;
  user_create: number;
}
