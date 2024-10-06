import { PagingMetaResponse } from '@/shared/interfaces/common';
import { IVA } from '../../administration';

export interface ProductosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  data: Producto[];
}

export interface Producto {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;
  codigo_auxiliar: string;
  state: boolean;
  descripcion: string;
  es_para_venta: boolean;
  precios: PrecioProducto[];
  tipo: string;

  created_at: string;
  modified_at: string;

  ///* fk
  iva: number;
  categoria: number;
  iva_data: IVA;
  categoria_data: CategoriaData;
}

export interface CategoriaData {
  id: number;
  created_at: string;
  modified_at: string;
  uuid: string;
  state: boolean;
  nombre: string;
}

export interface PrecioProducto {
  estado: boolean;
  nombre: string;
  precio: number;
}
