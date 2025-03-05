import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const ingresoMaterialFormSchema = yup.object({
  state: fieldStateYupValidation,
  observacion: yup
    .string()
    .typeError('El campo observacion es requerido')
    .required('El campo observacion es requerido'),

  bodega: yup
    .number()
    .typeError('El campo bodega es requerido')
    .optional()
    .nullable(),
  ubicacion: yup
    .number()
    .typeError('El campo ubicacion es requerido')
    .optional()
    .nullable(),
  motivo_ingreso: yup
    .number()
    .typeError('El campo motivo ingreso es requerido')
    .optional()
    .nullable(),
  user_create: yup
    .number()
    .typeError('El campo usuario es requerido')
    .optional()
    .nullable(),
});
