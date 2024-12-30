import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const solicitudMaterialFormSchema = yup.object({
  ubicacion: yup
    .string()
    .required('El campo nombre es requerido')
    .max(100, 'El campo nombre no debe exceder los 100 caracteres'),
  bodega: yup
    .string()
    .required('El campo direccion es requerido')
    .max(100, 'El campo direccion no debe exceder los 100 caracteres'),
  observacion: yup
    .string()
    .typeError('El campo centro costo es requerido')
    .required('El campo centro costo es requerido'),

  state: fieldStateYupValidation,
});
