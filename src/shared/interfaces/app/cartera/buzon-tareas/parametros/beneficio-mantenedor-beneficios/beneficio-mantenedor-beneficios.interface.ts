import {
  CanalVenta,
  MetodoPago,
  Zona,
} from '@/shared/interfaces/app/administration';
import { Producto } from '@/shared/interfaces/app/inventario';
import { PlanInternet } from '@/shared/interfaces/app/servicios';
import { PagingMetaResponse } from '@/shared/interfaces/common';
import { CuotasServicioInternet } from '../tipo-mantenedor-beneficios';

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
  description?: string;
  code: string;
  state?: boolean;

  aplica_descuento_meses_posterior?: boolean | string;
  aplica_descuento_meses_curso?: boolean | string;
  discapacidad?: boolean | string;
  tercera_edad?: boolean | string;
  plan_desarrollo_humano?: boolean | string;
  plan_retencion?: boolean | string;
  categorizacion_perfil?: string;
  categorizacion_pagos?: string;
  descuentos_cuotas?: CuotasServicioInternet[];
  tipo_mantenedor_beneficio?: number;
  subtipo_mantenedor_beneficio?: number;
  metodos_pago: MetodoPago[];
  planes_internet: PlanInternet[];
  zonas: Zona[];
  canales_venta: CanalVenta[];
  productos: Producto[];
}
