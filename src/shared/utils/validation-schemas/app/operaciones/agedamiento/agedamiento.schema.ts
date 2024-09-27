import * as yup from 'yup';

export const agendamientoVentasFormSchema = yup.object({
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

// estado llamada
export const agendamientoOperacionesConfirmFormSchema = yup.object({
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

  nombre_persona_referencia: yup
    .string()
    .required('El campo nombre persona referencia es requerido')
    .max(
      200,
      'El campo nombre persona referencia no debe exceder los 200 caracteres',
    ),
  parentesco_referencia: yup
    .string()
    .required('El campo parentesco referencia es requerido')
    .max(
      200,
      'El campo parentesco referencia no debe exceder los 200 caracteres',
    ),
  celular_adicional: yup
    .string()
    .required('El campo celular referencia es requerido'),
});
