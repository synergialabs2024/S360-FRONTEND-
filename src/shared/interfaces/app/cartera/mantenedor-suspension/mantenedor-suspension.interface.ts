import { CriterioMantenedorSuspensionEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface MantenedorSuspensionPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: MantenedorSuspension[];
}

export interface MantenedorSuspension {
  id?: number;
  uuid?: string;

  motivo: number;
  criterio: CriterioMantenedorSuspensionEnumChoice;
  code: string;
  meses_suspension: number;
  state?: boolean;
  tiempo_bloqueo?: number;
  tiempo_limite?: number;
  incluye_facturacion: boolean;
  incluye_notificacion: boolean;
  monto: string;
  grupos_usuario_autorizados: number[];

  created_at?: string;
  modified_at?: string;
}
