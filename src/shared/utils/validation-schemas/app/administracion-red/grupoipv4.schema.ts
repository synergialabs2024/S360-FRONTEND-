import * as yup from 'yup';

import { fieldPoolIpV4YupValidation, fieldStateYupValidation } from '../common';

export const grupoIPv4FormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  ipv_4: fieldPoolIpV4YupValidation,
  cidr: yup
    .number()
    .min(16, 'El valor mínimo es 16')
    .max(32, 'El valor máximo es 32')
    .typeError('El campo cidr es requerido')
    .required('El campo cidr es requerido'),
  tipo_uso: yup
    .string()
    .required('El campo tipo uso es requerido')
    .max(200, 'El campo tipo uso no debe exceder los 200 caracteres'),

  brass: yup
    .number()
    .typeError('El campo brass es requerido')
    .required('El campo brass es requerido'),
});
