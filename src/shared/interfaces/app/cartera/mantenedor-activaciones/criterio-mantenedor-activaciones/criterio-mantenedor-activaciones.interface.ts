import {
  LineaServicioEnumChoice,
  tipoRubroAdicionalMantenedorEnumChoice,
} from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface CriterioMantenedorActivacionBasePaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: CriterioMantenedorActivacion[];
}

export interface CriterioMantenedorActivacion {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;
  tipo_mantenedor_activacion: tipoRubroAdicionalMantenedorEnumChoice;
  estados_linea_servicio: LineaServicioEnumChoice[];
  dia_inicio_range: number;
  dia_fin_range: number;
}
