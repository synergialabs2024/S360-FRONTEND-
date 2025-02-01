import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CausaMantenedorBeneficiosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CausaMantenedorBeneficios[];
}

export interface CausaMantenedorBeneficios {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;
}
