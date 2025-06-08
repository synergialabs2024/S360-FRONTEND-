import { PagingMetaResponse } from '@/shared/interfaces/common';

export interface SoporteTecnicoPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: SoporteTecnico[];
}

export interface SoporteTecnico {
  id?: number;
  uuid?: string;

  cedula: number;
}

export interface SoporteTecnicoCliente {
  celular: string;
  celular_adicional: string;
  email: string;
  direccion_referencia: string;
  coordenadas: string;
}

export interface SoporteTecnicoHistorialYigasuite {
  CRM_soporte_tecnico?: CRM_soporte_tecnico[];
  CRM_cambio_plan?: CRM_cambio_plan[];
  CRM_cambio_domicilio?: CRM_cambio_domicilio[];
  CRM_contratar?: CRM_contratar[];
  CRM_migracion?: CRM_migracion[];
  CRM_suspension?: CRM_suspension[];
}
export interface CRM_soporte_tecnico {
  id: number;
  codigo: number;
  coleccion: string;
  cedula: string;
  usuarioacciones: string;
  direccion: string;
  estadocliente: string;
  unidadnegocio: string;
  idcliente: string;
  nombres: string;
  usuario_ingreso: string;
  tipoproblema: string;
  descripciontipootro: string;
  telefonos: string;
  plan: string;
  email: string;
  observacion: string;
  fecha_ingreso: string;
  usuario_modificacion: string;
  motivo: string;
  causa: string;
  fecha_modificacion: string;
  comentarios: ComentarioCRM[];
  estadosolicitud: string;
}
export interface CRM_cambio_plan {
  id: number;
  codigo: string;
  coleccion: string;
  motivo: string;
  cedula: string;
  direccion: string;
  estadocliente: string;
  plannuevo: string;
  idcliente: number;
  ruta_fotos: string;
  nombres: string;
  unidad: string;
  usuario_ingreso: string;
  telefono: string;
  plan: string;
  email: string;
  fecha_ingreso: string;
  fecha_modificacion: string;
  comentarios: ComentarioCRM[];
  estadosolicitud: string;
  usuario_modificacion: string;
}
export interface CRM_cambio_domicilio {
  id: number;
  codigo: string;
  coleccion: string;
  cedula: string;
  direccion: string;
  estadocliente: string;
  unidadnegocio: string;
  idcliente: number;
  nombres: string;
  usuario_ingreso: string;
  coordenadasnuevadireccion: string;
  referencianuevadireccion: string;
  telefonos: string;
  plan: string;
  email: string;
  fecha_ingreso: string;
  usuario_modificacion: string;
  fecha_modificacion: string;
  comentarios: ComentarioCRM[];
  estadosolicitud: string;
}
export interface CRM_contratar {
  id: number;
  codigo: string;
  coleccion: string;
  promocion: string;
  facturacion: string;
  cedula: string;
  usuarioacciones: string;
  referencias: string;
  coordenadas: string;
  provincia: string;
  pdfinstalacion: string;
  nombres: string;
  nacionalidad: string;
  instalador: string;
  pdfcedula: string;
  pdfservicios: string;
  estadocontrato: string;
  correo: string;
  conexion: string;
  pdfaceptacion: string;
  telefono1: string;
  telefono2: string;
  planideal: string;
  sector: string;
  plan: string;
  categoriaplan: string;
  archivo: string;
  descripcionarc: string;
  comparticion: string;
  direccion: string;
  contrato: string;
  firma: string;
  unidad: string;
  usuario_ingreso: string;
  fechapago: string;
  dispositivos: string;
  fechanacimiento: string;
  observaciones: string;
  parroquia: string;
  canton: string;
  duracion: string;
  fecha_ingreso: string;
  fecha_modificacion: string;
  comentarios: ComentarioCRM[];
  estadosolicitud: string;
  usuario_modificacion: string;
}
export interface CRM_migracion {
  id: number;
  codigo: number;
  coleccion: string;
  cedula: string;
  usuarioacciones: string;
  direccion: string;
  estadocliente: string;
  unidadnegocio: string;
  idcliente: string;
  nombres: string;
  usuario_ingreso: string;
  tipoproblema: string;
  descripciontipootro: string;
  telefonos: string;
  plan: string;
  email: string;
  observacion: string;
  fecha_ingreso: string;
  usuario_modificacion: string;
  motivo: string;
  causa: string;
  fecha_modificacion: string;
  comentarios: ComentarioCRM[];
  estadosolicitud: string;
}
export interface CRM_suspension {
  id: number;
  codigo: number;
  coleccion: string;
  tipo: string;
  cedula: string;
  direccion: string;
  estadocliente: string;
  unidadnegocio: string;
  idcliente: string;
  nombres: string;
  motivo_suspension: string;
  usuario_ingreso: string;
  telefono: string;
  plan: string;
  email: string;
  fecha_ingreso: string;
  usuario_modificacion: string;
  estado_solicitud: string;
  fecha_modificacion: string;
  comentarios: ComentarioCRM[];
}
export interface ComentarioCRM {
  accion: string;
  departamento: string;
  usuario: string;
  comentario: string;
}

export type SoporteTecnicoLimitData = Pick<SoporteTecnico, 'cedula'>;
