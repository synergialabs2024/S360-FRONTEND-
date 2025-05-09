import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';
import { TARJETA_CODE_ARRAY_CHOICES } from '@/shared/constants';

export const tarjetaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  code: yup
    .mixed()
    .oneOf(TARJETA_CODE_ARRAY_CHOICES, 'El codigo debe ser elegido')
    .required('El campo codigo es requerido'),
});
