import * as yup from 'yup';

import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';

export const departamentoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  area: yup
    .number()
    .typeError('El campo area es requerido')
    .required('El campo area es requerido'),
  description: descriptionYupValidation,
  state: fieldStateYupValidation,
});
