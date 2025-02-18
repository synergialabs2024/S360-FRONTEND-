import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemGroup } from '../administration';

export interface MotivosRubroAdicionalPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MotivoRubroAdicional[];
}

export interface MotivoRubroAdicional {
  id?: number;
  uuid?: string;

  tipo_rubro_adicional: string;
  grupos_usuario_autorizados: SystemGroup[];
  nombre: string;
  codigo: string;
  valor: string;
  descripcion?: string;
  state: boolean;

  created_at?: string;
  modified_at?: string;
}
