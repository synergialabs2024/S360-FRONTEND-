import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const solicitudMaterialFormSchema = yup.object({
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
});
