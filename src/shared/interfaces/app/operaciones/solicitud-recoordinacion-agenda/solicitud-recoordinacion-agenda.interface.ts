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

  created_at: string;
  modified_at: string;

  estado_solicitud: string;
  descripcion: string;

  agendamiento: number;
  usuario_atiende: number;

  area: number;
  departamento: number;
  canal_venta: number;
  vendedor: number;
}
