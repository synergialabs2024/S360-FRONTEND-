import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface TransaccionPichinchaPagosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: TransaccionPichinchaPago[];
}

export interface TransaccionPichinchaPago {
  id?: number;
  uuid?: string;

  id_sobre: string;
  id_item: string;
  referencia_sobre: string;
  pais: string;
  banco: string;
  formapago: string;
  pais_banco_cuenta: string;
  contrapartida: string;
  referencia: string;
  valor_procc: string;
  valor: string;
  moneda: string;
  fecha_proceso: string;
  hora_proceso: string;
  mensaje: string;
  referencia_adicional: string;
  numero_documento: string;
  tipo_pago: string;
  numero_cuenta: string;
  no_documento: string;
  estado_impresion: string;
  secuencial_cobro: string;
  numero_comprobante: string;
  bitmap39: string;
  bitmap40: string;
  estado: string;

  created_at?: string;
  modified_at?: string;
}
