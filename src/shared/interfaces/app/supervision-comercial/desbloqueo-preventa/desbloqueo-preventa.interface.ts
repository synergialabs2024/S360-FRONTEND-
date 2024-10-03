import {
  GeneralModelStatesEnumChoice,
  SalesModelsEnumChoice,
  SalesStatesActionsEnumChoice,
  SolicitudDesbloqueoTypeEnumChoice,
} from '@/shared/constants';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { SystemUserLimitData } from '../../administration';
import { Preventa } from '../../comercial';

export interface SolicitudDesbloqueoPreventasPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudDesbloqueoPreventa;
}

export interface SolicitudDesbloqueoPreventa {
  id?: number;
  uuid?: string;

  solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice; // choice
  state: boolean;

  motivo?: string;
  tipo?: SolicitudDesbloqueoTypeEnumChoice;

  // model related
  modelo: SalesModelsEnumChoice; // choice
  modelo_id: number;
  modelo_estado: SalesStatesActionsEnumChoice; // choice --- ACTIONS

  created_at?: string;
  modified_at?: string;

  ///* fk ------
  // controlled by backend
  area?: number; // admin area desbloqua (comercial)
  departamento?: number;
  canal_venta?: number;
  vendedor?: number; // user token

  vendedor_data?: SystemUserLimitData;
  gestionado_by_data?: SystemUserLimitData;
  modelo_data?: Preventa;
}

// bun ./__ts__/main.ts --ts_file="src/shared/interfaces/app/supervision-comercial/desbloqueo-preventa/desbloqueo-preventa.interface.ts" --iname=SolicitudDesbloqueoPreventa --pm=app --fcm=supervision-comercial/desbloqueo-preventa --ep="solicituddesbloqueoventas" --idmk="id" --pcn="comercial___solicituddesbloqueoventas"
