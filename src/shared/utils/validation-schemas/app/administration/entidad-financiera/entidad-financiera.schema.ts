import * as yup from 'yup';
import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';

export const entidadFinancieraFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  description: descriptionYupValidation.max(750, 'Max 750 caracteres'),
  code: yup
    .string()
    .required('El campo codigo es requerido')
    .max(10, 'El campo codigo no debe exceder los 10 caracteres'),
  state: fieldStateYupValidation,
});
