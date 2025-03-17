import { fieldStateYupValidation } from '../../common';
import * as yup from 'yup';

export const prioridadincidenciaTMFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  code: yup
    .string()
    .required('El campo code es requerido')
    .max(200, 'El campo code no debe exceder los 200 caracteres'),
  color_hex: yup
    .string()
    .required('El campo color hex es requerido')
    .max(7, 'El campo color hex no debe exceder los 7 caracteres'),
});
