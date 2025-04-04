import * as yup from 'yup';

export const mantenedorSuspensionBaseFormSchema = yup.object({
  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),

  incluye_facturacion_string: yup
    .string()
    .typeError('El campo incluye facturacion es requerido')
    .required('El campo incluye facturacion es requerido'),

  incluye_notificacion_string: yup
    .string()
    .typeError('El campo incluye notificacion es requerido')
    .required('El campo incluye notificacion es requerido'),

  monto: yup
    .string()
    .typeError('El campo monto es requerido')
    .required('El campo monto es requerido'),

  motivo: yup
    .number()
    .typeError('El campo motivo es requerido')
    .required('El campo motivo es requerido'),

  criterio: yup
    .string()
    .typeError('El campo criterio es requerido')
    .required('El campo criterio es requerido'),
});
