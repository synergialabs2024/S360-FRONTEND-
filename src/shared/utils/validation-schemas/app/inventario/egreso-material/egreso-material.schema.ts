import * as yup from 'yup';

export const egresoMaterialFormSchema = yup.object({
  observacion: yup
    .string()
    .typeError('El campo observacion es requerido')
    .required('El campo observacion es requerido'),

  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),

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
  motivo_egreso: yup
    .number()
    .typeError('El campo motivo egreso es requerido')
    .optional()
    .nullable(),
});
