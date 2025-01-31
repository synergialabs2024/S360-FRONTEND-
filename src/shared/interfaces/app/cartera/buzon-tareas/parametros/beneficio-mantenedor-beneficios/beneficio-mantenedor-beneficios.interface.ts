import {
  CanalVenta,
  MetodoPago,
  Zona,
} from '@/shared/interfaces/app/administration';
import { Producto } from '@/shared/interfaces/app/inventario';
import { PlanInternet } from '@/shared/interfaces/app/servicios';
import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface BeneficioMantenedorBeneficiosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: BeneficioMantenedorBeneficios[];
}

export interface BeneficioMantenedorBeneficios {
  id?: number;
  uuid?: string;
  name: string;
  description: string;
  code: string;
  state: boolean;

  aplica_descuento_meses_posterior: boolean;
  aplica_descuento_meses_curso: boolean;
  discapacidad: boolean;
  tercera_edad: boolean;
  plan_desarrollo_humano: boolean;
  plan_retencion: boolean;
  categorizacion_perfil: string;
  categorizacion_pagos: string;
  tipo_mantenedor_beneficio: number;
  subtipo_mantenedor_beneficio: string;
  metodos_pago: MetodoPago[];
  planes_internet: PlanInternet[];
  zonas: Zona[];
  canales_venta: CanalVenta[];
  productos: Producto[];
}
