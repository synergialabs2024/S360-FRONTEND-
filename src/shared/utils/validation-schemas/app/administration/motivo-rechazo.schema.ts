import * as yup from 'yup';

import { MotivoRechazoModuloEnumChoice } from '@/shared/constants';
import { fieldStateYupValidation } from '../common';

export const motivoRechazoFormSchema = yup.object({
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
      Object.values(MotivoRechazoModuloEnumChoice),
      'El campo modulo no es válido',
    ),
});
