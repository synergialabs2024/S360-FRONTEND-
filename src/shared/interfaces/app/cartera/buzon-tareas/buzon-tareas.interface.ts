import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface BuzonTareaPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: BuzonTarea[];
}

export interface BuzonTarea {
  id?: number;
  uuid?: string;
  created_at?: string;
  modified_at?: string;
  numero_referencia: string;
  estado_tarea: string;
  aplica_beneficio: string;
  canal_referencia: string;
  tipo_tarea: string;
  subtipo_tarea: string;
  detalle_caso: string;

  detalle_solucion: string;
  aplica_beneficio_solucion: string;
  beneficio_aplicado: string;
  necesita_escalamiento: boolean;
  justificacion_escalamiento: string;
  tiempo_permancencia: string;
  tipo_cliente: string;
  categorizacion_perfil: string;
  categorizacion_pagos: string;
  usuario_creacion: number;
  departamento_asignado: number;

  cliente: number;
  contrato: number;
  linea_servicio: number;
  beneficio: number;
}
