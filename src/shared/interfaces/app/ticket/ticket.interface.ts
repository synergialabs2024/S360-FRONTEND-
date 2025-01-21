import { MotivoCorreccionOTAuditoriaEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '../../common';
import { Ciudad } from '../administration';
import { LineaServicio } from '../cliente';
import { FlotaLimitData } from '../mante-operacion';
import {
  EquipoUtilizadosInstallOT,
  MaterialUtilizadosInstallOT,
} from '../tecnico';

export interface TicketPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Ticket[];
}

export interface Ticket {
  id?: number;
  uuid?: string;
  numero_contrato?: string;
  tipo_identificacion?: string;
  identificacion?: string;
  es_cliente?: boolean;
  razon_social?: string;
  coordenadas?: string;
  zona?: string;
  celular_adicional?: string;
  nap?: string;
  franja_horaria?: string;
  telefono?: string;
  fecha_sugerida_visita?: string;
  fecha_hora_visita?: string;

  motivo_rechazo?: string;

  url_foto_antes_solucion?: string;
  url_foto_despues_solucion?: string;
  url_foto_test_velocidad?: string;
  url_foto_potencia_antes_solucion?: string;
  url_foto_potencia_despues_solucion?: string;
  url_foto_problema_encontrado?: string;
  url_foto_solucion?: string;
  url_foto_entrega_mesh?: string;
  url_foto_entrega_ups?: string;

  url_foto_opcional?: string;
  url_foto_vivienda?: string;
  linea_servicio?: number;
  origen_ticket?: number;
  asunto_ticket?: number;
  solucion_tecnico?: number;
  asunto_ticket_data?: AsuntoTicketData;
  linea_servicio_data?: LineaServicio;
  flota_data?: FlotaLimitData;

  valor_a_cobrar?: string;

  detalle_adicional_ticket?: string;
  observacion_extra_solucion_visita?: string;

  // ESPERA - EN PROCESO - CERRADO
  estado_ticket?: string;

  estado_ticket_tecnico?: string;

  // INVENTARIO -------------------
  equipos_utilizados: EquipoUtilizadosInstallOT[];
  materiales_utilizados: MaterialUtilizadosInstallOT[];

  punta_inicial_fibra: string;
  punta_final_fibra: string;
  metraje_utilizado_fibra: string;
  metraje_exedente_fibra: string;
  serie_ont?: string;
  potencia_ont: string;
  observaciones_adicionales: string;
  modelo_fibra_utilizada?: string; // code
  modelo_ont_wifi: string; // code

  asunto_ticket_tecnico?: number;

  nombre_persona_referencia?: string;
  parentesco_referencia?: string;

  ciudad_data?: Ciudad;

  motivo_correccion?: MotivoCorreccionOTAuditoriaEnumChoice;
  observacion_correccion?: string;
}

export interface AsuntoTicketData {
  id: number;
  name: number;
  uuid: number;
  valor_cobrar: string;
}
