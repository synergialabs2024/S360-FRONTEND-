import * as yup from 'yup';

export const planificadorFormSchema = yup.object({
  fecha: yup
    .string()
    .required('El campo fecha es requerido')
    .max(200, 'El campo fecha no debe exceder los 200 caracteres'),

  flota: yup
    .number()
    .typeError('El campo flota es requerido')
    .required('El campo flota es requerido'),
});
