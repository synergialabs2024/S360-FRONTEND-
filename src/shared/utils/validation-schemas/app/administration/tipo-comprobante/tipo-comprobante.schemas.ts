import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const tipoComprobanteFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(100, 'El campo name no debe exceder los 100 caracteres'),
  state: fieldStateYupValidation,
  codigo: yup
    .string()
    .required('El campo codigo es requerido')
    .max(100, 'El campo codigo no debe exceder los 100 caracteres'),
});
