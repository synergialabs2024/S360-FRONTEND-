import * as yup from 'yup';

import { TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES } from '@/shared/constants';

export const ordenTrabajoFormSchema = yup.object({
  hora_inicio: yup
    .string()
    .required('El campo hora inicio es requerido')
    .max(200, 'El campo hora inicio no debe exceder los 200 caracteres'),
  hora_fin: yup
    .string()
    .required('El campo hora fin es requerido')
    .max(200, 'El campo hora fin no debe exceder los 200 caracteres'),

  potencia_ont: yup
    .number()
    .required('El campo potencia ont es requerido')
    .typeError('El campo potencia ont debe ser un número')
    .positive('El campo potencia ont debe ser un número positivo')
    .min(1, 'El campo potencia ont debe ser mayor a 0'),

  // INVENTARIO -------------------
  punta_inicial_fibra: yup
    .number()
    .required('El campo punta inicial fibra es requerido')
    .typeError('El campo punta inicial fibra debe ser un número')
    .positive('El campo punta inicial fibra debe ser un número positivo')
    .min(1, 'El campo punta inicial fibra debe ser mayor a 0'),
  punta_final_fibra: yup
    .number()
    .required('El campo punta final fibra es requerido')
    .typeError('El campo punta final fibra debe ser un número')
    .positive('El campo punta final fibra debe ser un número positivo')
    .min(1, 'El campo punta final fibra debe ser mayor a 0')
    .test(
      'punta_final_fibra',
      'La punta final fibra debe ser mayor a la punta inicial fibra',
      function (value) {
        return value > this.parent.punta_inicial_fibra;
      },
    ),
  metraje_utilizado_fibra: yup
    .string()
    .required('El campo metraje utilizado fibra es requerido')
    .max(
      200,
      'El campo metraje utilizado fibra no debe exceder los 200 caracteres',
    ),

  // ACTIVACION -------------------
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
