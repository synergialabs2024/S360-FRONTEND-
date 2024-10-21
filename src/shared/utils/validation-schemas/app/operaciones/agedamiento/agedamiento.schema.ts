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

  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(200, 'El campo celular no debe exceder los 200 caracteres'),
  estado_llamada: yup
    .string()
    .required('El campo estado llamada es requerido')
    .max(200, 'El campo estado llamada no debe exceder los 200 caracteres'),

  flota: yup
    .number()
    .typeError('El campo flota es requerido')
    .optional()
    .nullable(),
  nap: yup.number().typeError('El campo nap es requerido').optional(),
  distancia_nap: yup
    .number()
    .typeError('El campo distancia nap es requerido')
    .optional(),

  observacion_llamada: yup.string().optional(),

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

export const updAgendamientoOpSchema = yup.object({
  estado_agendamiento: yup
    .string()
    .required('El campo estado agendamiento es requerido')
    .max(
      200,
      'El campo estado agendamiento no debe exceder los 200 caracteres',
    ),
  motivo_actualizacion: yup
    .string()
    .required('El campo motivo actualizacion es requerido')
    .max(
      200,
      'El campo motivo actualizacion no debe exceder los 200 caracteres',
    ),
  observacion_actualizacion: yup
    .string()
    .required('El campo observacion actualizacion es requerido')
    .max(
      200,
      'El campo observacion actualizacion no debe exceder los 200 caracteres',
    ),
});
