import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SubtipoMantenedorBeneficiosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SubtipoMantenedorBeneficios[];
}

export interface SubtipoMantenedorBeneficios {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;
  motivo: string;
  causa: number;
  solucion: number;
  tipo_mantenedor_beneficio: number;
}
