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

  description: descriptionYupValidation,
  empresa: yup
    .number()
    .typeError('El campo empresa es requerido')
    .required('El campo empresa es requerido'),

  state: fieldStateYupValidation,
});
