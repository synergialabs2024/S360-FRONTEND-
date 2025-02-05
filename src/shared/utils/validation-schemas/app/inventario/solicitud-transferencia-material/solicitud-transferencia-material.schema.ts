import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const solicitudTransferenciaMaterialFormSchema = yup.object({
  state: fieldStateYupValidation,
  observacion: yup
    .string()
    .typeError('El campo observacion es requerido')
    .required('El campo observacion es requerido'),

  bodega_origen: yup
    .number()
    .typeError('El campo bodega origen es requerido')
    .nullable(),
  ubicacion_origen: yup
    .number()
    .typeError('El campo ubicacion origen es requerido')
    .nullable(),
  bodega_destino: yup
    .number()
    .typeError('El campo bodega destino es requerido')
    .nullable(),
  ubicacion_destino: yup
    .number()
    .typeError('El campo ubicacion destino es requerido')
    .nullable(),
});
