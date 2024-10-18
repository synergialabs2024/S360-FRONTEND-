import * as yup from 'yup';
import { fieldStateYupValidation } from '../common';

export const categoriaProductoFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
});
