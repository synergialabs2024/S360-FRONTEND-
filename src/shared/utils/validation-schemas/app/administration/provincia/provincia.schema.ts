import * as yup from 'yup';

export const provinciaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  has_coverage: yup
    .boolean()
    .typeError('El campo has coverage es requerido')
    .required('El campo has coverage es requerido'),
  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),

  pais: yup
    .number()
    .typeError('El campo pais es requerido')
    .optional()
    .nullable(),
});
