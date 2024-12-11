import * as yup from 'yup';
import { fieldStateYupValidation } from '../../../common';

export const origenFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
});
