import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SolucionMantenedorBeneficiosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolucionMantenedorBeneficios[];
}

export interface SolucionMantenedorBeneficios {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;
}
