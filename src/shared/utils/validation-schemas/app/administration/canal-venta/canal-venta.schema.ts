import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const canalVentaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  empresa: yup
    .number()
    .required('El campo empresa es requerido')
    .typeError('El campo empresa es requerido'),
  state: fieldStateYupValidation,
});
