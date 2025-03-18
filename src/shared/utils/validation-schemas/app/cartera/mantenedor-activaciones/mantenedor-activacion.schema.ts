import * as yup from 'yup';

export const mantenedorActivacionFormSchema = yup.object({
  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),

  criterio: yup
    .number()
    .typeError('El campo criterio caso es requerido')
    .required('El campo criterio caso es requerido'),

  motivo: yup
    .number()
    .typeError('El campo motivo es requerido')
    .required('El campo motivo es requerido'),
});
