import * as yup from 'yup';

import { MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES } from '@/shared/constants';
import { fieldStateYupValidation } from '../common';

export const motivoActualizacionFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  description: yup
    .string()
    .required('El campo description es requerido')
    .max(200, 'El campo description no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  modulo: yup
    .string()
    .required('El campo modulo es requerido')
    .max(200, 'El campo modulo no debe exceder los 200 caracteres')
    .oneOf(
      MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES,
      'El campo modulo no es válido',
    ),
});
