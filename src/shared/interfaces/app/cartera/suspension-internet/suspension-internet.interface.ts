import {
  SuspensionInternetEstadoTMEnumChoice,
  SuspensionInternetTipoTMEnumChoice,
} from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SuspensionInternetPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SuspensionInternet[];
}

export interface SuspensionInternet {
  id?: number;
  uuid?: string;

  tipo_suspension: SuspensionInternetTipoTMEnumChoice;
  estado_suspension: SuspensionInternetEstadoTMEnumChoice;

  //fk
  mantenedor_suspension: number;
  motivo: number;
  user_create: number;
  cliente: number;
  linea_servicio: number;
  contrato: number;

  created_at?: string;
  modified_at?: string;
}
