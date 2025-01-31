import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TipoMantenedorBeneficiosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: TipoMantenedorBeneficios[];
}

export interface TipoMantenedorBeneficios {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;
}
