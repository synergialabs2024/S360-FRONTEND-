import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface ConfiguracionesPlantillaClientePaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: ConfiguracionPlantillaCliente[];
}

export interface ConfiguracionPlantillaCliente {
  id?: number;
  uuid?: string;

  created_at?: string;
  modified_at?: string;

  name: string;
  state: boolean;

  dia_pago: number;
  dia_facturacion: number;
  dia_suspension: number;

  dia_pago_limite: number;
  crea_factura: string;
  dias_gracia: string;
  aplica_corte: string;
  aplica_mora: boolean;
  aplica_reconexion: boolean;
  bajar_velocidad: boolean;
  aviso_pantalla: string;
  recordatorio_pago: string;
  recordatorio_1: string;
  recordatorio_2: string;
  recordatorio_3: string;
  impuesto_1: number;
  impuesto_2: number;
  impuesto_3: number;
}
