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

  permitido_en_anio: yup
    .number()
    .typeError('El campo tiempo limite es requerido')
    .required('El campo tiempo limite es requerido')
    .min(1, 'El campo permitido en anio no debe ser menor a 1')
    .max(12, 'El campo permitido en anio no debe exceder a 12'),

  motivo: yup
    .number()
    .typeError('El campo motivo es requerido')
    .required('El campo motivo es requerido'),
});
