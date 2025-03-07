import { TipoPlantillaConfigClienteEnumChoice } from '@/shared/constants';
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

  name: string;
  state: boolean;

  tipo_configuracion: TipoPlantillaConfigClienteEnumChoice;
  default_config: boolean;

  dia_pago: number; // CalendarioFacturacion - 1-31
  dia_facturacion: number; // CalendarioFacturacion - 1-31
  dia_suspension: number; // CalendarioFacturacion - 1-31

  crea_factura?: string; // null or days before

  dia_pago_limite: number; // 1-31
  dias_gracia: number; //  dias tolerancia prev corte - dia_pago_limite?

  // ---------------------------
  aplica_reconexion: boolean;
  valor_reconexion: string; // null or valor
  // ---------------------------

  aplica_corte: string; // null or meses vencidos -----

  aplica_mora: boolean;

  bajar_velocidad: boolean; // no suspende, sino q baja velocidad

  aviso_pantalla: string; // null or days before corte -----
  recordatorio_pago: string; // null or medio (SMS, EMAIL, etc.)

  recordatorio_1: string; // null or days before corte
  recordatorio_2: string; // null or days before corte
  recordatorio_3: string; // null or days before corte

  impuesto_1: number;
  impuesto_2: number;
  impuesto_3: number;

  created_at?: string;
  modified_at?: string;
}
