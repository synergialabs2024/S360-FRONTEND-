import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const movimientoMaterialFormSchema = yup.object({
  cantidad: yup
    .number()
    .typeError('El campo cantidad es requerido')
    .min(-2147483648)
    .max(2147483647)
    .nullable(),

  observacion: yup
    .string()
    .typeError('El campo observacion es requerido')
    .required('El campo observacion es requerido'),

  state: fieldStateYupValidation,

  producto: yup
    .number()
    .typeError('El campo producto es requerido')
    .optional()
    .nullable(),
  bodega_origen: yup
    .number()
    .typeError('El campo bodega origen es requerido')
    .optional()
    .nullable(),
  ubicacion_origen: yup
    .number()
    .typeError('El campo ubicacion origen es requerido')
    .optional()
    .nullable(),

  bodega_destino: yup
    .number()
    .typeError('El campo bodega destino es requerido')
    .optional()
    .nullable(),
  ubicacion_destino: yup
    .number()
    .typeError('El campo ubicacion destino es requerido')
    .optional()
    .nullable(),
});
