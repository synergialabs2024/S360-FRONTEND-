import * as yup from 'yup';

export const agendamientoFormSchema = yup.object({
  fecha_instalacion: yup
    .string()
    .required('El campo fecha instalacion es requerido')
    .max(200, 'El campo fecha instalacion no debe exceder los 200 caracteres'),
  hora_instalacion: yup
    .string()
    .required('El campo hora instalacion es requerido')
    .max(200, 'El campo hora instalacion no debe exceder los 200 caracteres'),

  flota: yup
    .number()
    .typeError('El campo flota es requerido')
    .optional()
    .nullable(),
});
