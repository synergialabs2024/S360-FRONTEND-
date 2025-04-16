import * as yup from 'yup';
import { fieldStateYupValidation } from '../../../common';

export const asuntoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,

  valor_cobrar: yup
    .number()
    .typeError('El campo valor a cobrar es requerido')
    .required('El campo valor a cobrar es requerido'),
  tipo_asunto_ticket: yup
    .string()
    .required('El campo tipo ticket es requerido'),
});
