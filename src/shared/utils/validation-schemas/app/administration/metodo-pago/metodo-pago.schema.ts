import * as yup from 'yup';
import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';

export const metodoPagoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  code: yup
    .string()
    .required('El campo codigo es requerido')
    .max(200, 'El campo codigo no debe exceder los 200 caracteres'),
  description: descriptionYupValidation.max(750, 'Max 750 caracteres'),
  state: fieldStateYupValidation,
});
