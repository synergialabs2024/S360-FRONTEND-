import { Producto } from '../producto.interface';

export interface SolicitudMaterial {
  id?: number;
  uuid?: string;
  state: boolean;
  observacion: string;
  productos: Producto[];
  bodega: number;
  ubicacion: number;

  created_at?: string;
  modified_at?: string;
}

export type BodegaLimitData = Pick<SolicitudMaterial, 'uuid' | 'bodega' | 'id'>;
