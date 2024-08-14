import * as yup from 'yup';
import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';

export const cargoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  description: descriptionYupValidation,

  state: fieldStateYupValidation,
});
