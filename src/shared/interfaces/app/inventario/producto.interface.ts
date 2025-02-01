import { TipoProductoEnumChoice } from '@/shared/constants';
import { PagingMetaResponse } from '../../common';
import { IVA } from '../administration';
import { CategoriaProducto } from './categoria-producto.interface';
import { ModeloInventario } from './modelo-inventario';

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
  requiere_series: boolean;
  aplica_promocion: boolean;

  es_para_venta: boolean; // preventas
  metraje_relativo?: string; // to handle m in CodigoModeloProductoEnumChoice

  precios?: PrecioProducto[];
  tipo?: TipoProductoEnumChoice;

  created_at?: string;
  modified_at?: string;

  ///* fk
  iva?: number;
  modelo?: number;
  categoria?: number;

  iva_data?: IVA;
  modelo_data?: ModeloInventario;
  categoria_data?: CategoriaProducto;

  ubicaciones_producto?: UProducto;
}

export interface PrecioProducto {
  nombre: string;
  valor: number;
  default: boolean;
  descripcion?: string;
}

export interface UProducto {
  stock: any;
  uuid: string;
  series: string[];
  bodega: string;
  stock_up: number;
  ubicacion: string;
}
