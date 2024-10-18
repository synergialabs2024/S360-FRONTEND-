import { UserRolesEnumChoice } from '@/shared';

export interface NotificacionVentaUsuarioSocket {
  id?: number;
  uuid?: string;
  notificacion_venta_data: NotificacionVentaData;
  destinatario_data: UserLimitData;
  created_at: string;
  modified_at: string;
  leida: boolean;
  fecha_leida: null;
  area?: number;
  departamento?: number;
  canal_venta?: number;
  vendedor?: number;
  notificacion_venta?: number;
  destinatario: number;
}

export interface UserLimitData {
  username: string;
  email: string;
  razon_social: string;
  uuid: string;
  role: UserRolesEnumChoice;
}

export interface NotificacionVentaData {
  id?: number;
  uuid?: string;
  solicitud_servicio_data?: number;
  preventa_data?: number;
  solicitud_desbloqueo_ventas_data?: number;
  codigo_otp_data?: number;
  vendedor_data?: UserLimitData;
  created_at?: string;
  modified_at?: string;
  titulo: string;
  mensaje: string;
  tipo: string;
  solicitud_servicio?: number;
  preventa?: number;
  solicitud_desbloqueo_ventas?: number;
  codigo_otp?: number;
  vendedor?: number;
}
