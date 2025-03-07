import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const mensajeriaTicketMasivoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(255, 'El campo nombre no debe exceder los 255 caracteres'),
  state: fieldStateYupValidation,
  description: yup.string().required('El campo descripcion es requerido'),
});
