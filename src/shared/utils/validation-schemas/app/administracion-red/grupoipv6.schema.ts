import * as yup from 'yup';

import { fieldPoolIpV6YupValidation, fieldStateYupValidation } from '../common';

export const grupoIPv6FormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  ipv_6: fieldPoolIpV6YupValidation,
  cidr: yup
    .number()
    .typeError('El campo cidr es requerido')
    .required('El campo cidr es requerido'),
  tipo_uso: yup
    .string()
    .required('El campo tipo uso es requerido')
    .max(200, 'El campo tipo uso no debe exceder los 200 caracteres'),
});
