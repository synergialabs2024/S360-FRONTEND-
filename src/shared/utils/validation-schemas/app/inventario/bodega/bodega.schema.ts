import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const bodegaFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(100, 'El campo nombre no debe exceder los 100 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(100, 'El campo direccion no debe exceder los 100 caracteres'),
  centro_costo: yup
    .number()
    .typeError('El campo centro costo es requerido')
    .required('El campo centro costo es requerido'),

  es_externa: yup
    .boolean()
    .typeError('El externa es Requerido')
    .required('El externa es Requerido'),
  state: fieldStateYupValidation,
});
