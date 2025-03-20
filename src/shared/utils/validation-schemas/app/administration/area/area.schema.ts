import * as yup from 'yup';
import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';

export const areaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),

  code: yup
    .string()
    .required('El campo code es requerido')
    .max(200, 'El campo code no debe exceder los 200 caracteres'),
  centro_costo: yup
    .number()
    .typeError('El campo centro costo es requerido')
    .required('El campo centro costo es requerido'),
  state: fieldStateYupValidation,
  description: descriptionYupValidation,
});
