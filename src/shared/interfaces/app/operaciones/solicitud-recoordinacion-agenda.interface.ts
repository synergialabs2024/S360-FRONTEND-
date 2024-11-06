import {
  Agendamiento,
  GeneralModelStatesEnumChoice,
  SystemUserLimitData,
  TrazabilidadVentas,
} from '@/shared';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SolicitudesRecoordinacionAgendaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudRecoordinacionAgenda[];
}

export interface SolicitudRecoordinacionAgenda {
  id?: number;
  uuid?: string;

  estado_solicitud: GeneralModelStatesEnumChoice;
  descripcion: string;

  usuario_atiende: number;
  fecha_atiende?: string;
  observacion_atiende?: string;

  created_at?: string;
  modified_at?: string;

  trazabilidad_data?: TrazabilidadVentas[]; // JSON

  ///* fk
  agendamiento?: number;

  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;

  vendedor_data?: SystemUserLimitData;
  usuario_atiende_data?: SystemUserLimitData;
  agendamiento_data?: Agendamiento;
}
