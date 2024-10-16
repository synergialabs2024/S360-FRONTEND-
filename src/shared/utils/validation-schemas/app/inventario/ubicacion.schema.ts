import * as yup from 'yup';
import { fieldStateYupValidation } from '../common';

export const ubicacionFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,

  bodega: yup
    .number()
    .typeError('El campo bodega es requerido')
    .required('El campo bodega es requerido'),
});
