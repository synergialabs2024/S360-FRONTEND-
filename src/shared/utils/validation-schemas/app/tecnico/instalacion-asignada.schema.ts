import * as yup from 'yup';

import { TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES } from '@/shared/constants';

export const ordenTrabajoFormSchema = yup.object({
  estado_orden_trabajo: yup
    .string()
    .required('El campo estado orden trabajo es requerido')
    .max(
      200,
      'El campo estado orden trabajo no debe exceder los 200 caracteres',
    ),
  tipo_orden_trabajo: yup
    .string()
    .required('El campo tipo orden trabajo es requerido')
    .max(200, 'El campo tipo orden trabajo no debe exceder los 200 caracteres'),

  hora_inicio: yup
    .string()
    .required('El campo hora inicio es requerido')
    .max(200, 'El campo hora inicio no debe exceder los 200 caracteres'),
  hora_fin: yup
    .string()
    .required('El campo hora fin es requerido')
    .max(200, 'El campo hora fin no debe exceder los 200 caracteres'),
  materiales_utilizados: yup
    .string()
    .required('El campo materiales utilizados es requerido')
    .max(
      200,
      'El campo materiales utilizados no debe exceder los 200 caracteres',
    ),
  equipos_utilizados: yup
    .string()
    .required('El campo equipos utilizados es requerido')
    .max(200, 'El campo equipos utilizados no debe exceder los 200 caracteres'),
  punta_inicial_fibra: yup
    .string()
    .required('El campo punta inicial fibra es requerido')
    .max(
      200,
      'El campo punta inicial fibra no debe exceder los 200 caracteres',
    ),
  punta_final_fibra: yup
    .string()
    .required('El campo punta final fibra es requerido')
    .max(200, 'El campo punta final fibra no debe exceder los 200 caracteres'),
  metraje_utilizado_fibra: yup
    .string()
    .required('El campo metraje utilizado fibra es requerido')
    .max(
      200,
      'El campo metraje utilizado fibra no debe exceder los 200 caracteres',
    ),
  metraje_exedente_fibra: yup
    .string()
    .required('El campo metraje exedente fibra es requerido')
    .max(
      200,
      'El campo metraje exedente fibra no debe exceder los 200 caracteres',
    ),
  serie_ont: yup
    .string()
    .required('El campo serie ont es requerido')
    .max(200, 'El campo serie ont no debe exceder los 200 caracteres'),
  potencia_ont: yup
    .string()
    .required('El campo potencia ont es requerido')
    .max(200, 'El campo potencia ont no debe exceder los 200 caracteres'),

  estado_activacion: yup
    .string()
    .required('El campo estado activacion es requerido')
    .max(200, 'El campo estado activacion no debe exceder los 200 caracteres'),
  ipv4: yup
    .string()
    .required('El campo ipv4 es requerido')
    .max(200, 'El campo ipv4 no debe exceder los 200 caracteres'),
  ipv6: yup
    .string()
    .required('El campo ipv6 es requerido')
    .max(200, 'El campo ipv6 no debe exceder los 200 caracteres'),
  pppoe: yup
    .string()
    .required('El campo pppoe es requerido')
    .max(200, 'El campo pppoe no debe exceder los 200 caracteres'),
  pppassword: yup
    .string()
    .required('El campo pppassword es requerido')
    .max(200, 'El campo pppassword no debe exceder los 200 caracteres'),
  observacion_prerechazo: yup
    .string()
    .required('El campo observacion prerechazo es requerido')
    .max(
      200,
      'El campo observacion prerechazo no debe exceder los 200 caracteres',
    ),
  flota: yup
    .number()
    .typeError('El campo flota es requerido')
    .required('El campo flota es requerido'),
  motivo_prerechazo: yup
    .number()
    .typeError('El campo motivo prerechazo es requerido')
    .required('El campo motivo prerechazo es requerido'),
  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .required('El campo linea servicio es requerido'),
  solicitud_servicio: yup
    .number()
    .typeError('El campo solicitud servicio es requerido')
    .required('El campo solicitud servicio es requerido'),
  preventa: yup
    .number()
    .typeError('El campo preventa es requerido')
    .required('El campo preventa es requerido'),
  agendamiento: yup
    .number()
    .typeError('El campo agendamiento es requerido')
    .required('El campo agendamiento es requerido'),
  nodo: yup
    .number()
    .typeError('El campo nodo es requerido')
    .required('El campo nodo es requerido'),
  olt: yup
    .number()
    .typeError('El campo olt es requerido')
    .required('El campo olt es requerido'),
  router: yup
    .number()
    .typeError('El campo router es requerido')
    .required('El campo router es requerido'),
  pool_ipv4: yup
    .number()
    .typeError('El campo pool ipv4 es requerido')
    .required('El campo pool ipv4 es requerido'),
  pool_ipv6: yup
    .number()
    .typeError('El campo pool ipv6 es requerido')
    .required('El campo pool ipv6 es requerido'),
});

// // --------------------
export const requestChangePortSchema = yup.object({
  tipo_actualizacion_puerto: yup
    .string()
    .required('El campo tipo actualizacion puerto es requerido')
    .oneOf(
      TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES,
      'El campo tipo actualizacion puerto no es válido',
    ),

  observacion_cambio_puerto: yup
    .string()
    .optional()
    .nullable()
    .max(
      200,
      'El campo observacion cambio puerto no debe exceder los 200 caracteres',
    ),
});
