import { fieldStateYupValidation } from '../../common';
import * as yup from 'yup';

export const solicitudCompraFormSchema = yup.object({
  state: fieldStateYupValidation,
  observacion: yup
    .string()
    .typeError('El campo centro costo es requerido')
    .required('El campo centro costo es requerido'),

  bodega: yup
    .string()
    .required('El campo direccion es requerido')
    .max(100, 'El campo direccion no debe exceder los 100 caracteres'),
  ubicacion: yup
    .string()
    .required('El campo nombre es requerido')
    .max(100, 'El campo nombre no debe exceder los 100 caracteres'),
  user_create: yup
    .number()
    .typeError('El campo usuario es requerido')
    .optional()
    .nullable(),
});
