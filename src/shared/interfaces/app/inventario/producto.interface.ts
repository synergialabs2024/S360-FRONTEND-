import { PagingMetaResponse } from '../../common';
import { IVA } from '../administration';
import { CategoriaProducto } from './categoria-producto.interface';

export interface ProductosPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Producto[];
}

export interface Producto {
  id?: number;
  uuid?: string;

  nombre: string;
  codigo: string;
  codigo_auxiliar: string;
  state: boolean;
  descripcion: string;

  es_para_venta: boolean; // preventas

  precios?: PrecioProducto[];
  tipo: string;

  created_at?: string;
  modified_at?: string;

  ///* fk
  iva?: number;
  categoria?: number;

  iva_data?: IVA;
  categoria_data?: CategoriaProducto;
}

export interface PrecioProducto {
  nombre: string;
  valor: number;
  default: boolean;
  descripcion?: string;
}
