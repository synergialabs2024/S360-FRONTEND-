import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const canalVentaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  consultas_buro_user: yup
    .number()
    .typeError('Este campo es requerido')
    .required('Este campo es requerido'),
});
