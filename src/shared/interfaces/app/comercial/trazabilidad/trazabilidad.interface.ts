import { SystemUserLimitData } from '../../administration';

export interface TrazabilidadVentas {
  id?: number;
  uuid?: string;

  modelo_name: string;
  modelo: number;
  modelo_estado: string;

  user: number;
  user_uuid: string;
  timestamp: string;

  created_at?: string;
  modified_at?: string;

  user_data?: SystemUserLimitData;
}
