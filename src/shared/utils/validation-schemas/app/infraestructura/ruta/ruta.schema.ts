import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const rutaFormSchema = yup.object({
  state: fieldStateYupValidation,
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(245, 'El campo name no debe exceder los 245 caracteres'),
});
