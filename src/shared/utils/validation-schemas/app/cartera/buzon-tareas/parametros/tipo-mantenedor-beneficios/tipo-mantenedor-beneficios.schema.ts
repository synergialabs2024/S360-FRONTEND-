import * as yup from 'yup';

export const tipoMantenedorBeneficiosFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  description: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),
});
