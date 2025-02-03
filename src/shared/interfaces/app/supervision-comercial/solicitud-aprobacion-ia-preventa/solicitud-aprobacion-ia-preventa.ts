import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SolicitudesAprobacionIAPreventaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SolicitudAprobacionIAPreventa[];
}

export interface SolicitudAprobacionIAPreventa {
  id?: number;
  uuid?: string;

  estado_solicitud: string;
  descripcion: string;

  created_at: string;
  modified_at: string;

  ///* fk
  preventa: number;
  vendedor: number;
  area: number;
  departamento: number;
  canal_venta: number;
  usuario_gestion: null;
}

// src/shared/interfaces/app/supervision-comercial/solicitud-aprobacion-ia-preventa/solicitud-aprobacion-ia-preventa.ts

// bun ./__ts__/main.ts --ts_file="src/shared/interfaces/app/supervision-comercial/solicitud-aprobacion-ia-preventa/solicitud-aprobacion-ia-preventa.ts" --iname=SolicitudAprobacionIAPreventa --pm=app --fcm=supervision-comercial/solicitud-aprobacion-ia-preventa --ep="solicitud-aprobacion-ia-preventa" --idmk="id" --pcn="comercial___solicitud_aprobacion_ia_preventa"
