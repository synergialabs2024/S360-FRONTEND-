import * as yup from 'yup';

export const buzonTareaFormSchema = yup.object({
  canal_referencia: yup
    .string()
    .typeError('El campo canal referencia es requerido')
    .required('El campo canal referencia es requerido'),

  detalle_caso: yup
    .string()
    .typeError('El campo detalle caso es requerido')
    .required('El campo detalle caso es requerido'),

  tipo_tarea: yup
    .number()
    .typeError('El campo tipo tarea es requerido')
    .required('El campo tipo tarea es requerido'),

  subtipo_tarea: yup
    .number()
    .typeError('El campo subtipo tarea es requerido')
    .required('El campo subtipo tarea es requerido'),

  causa_tarea: yup
    .number()
    .typeError('El campo causa tarea es requerido')
    .required('El campo causa tarea es requerido'),

  identificacion: yup
    .string()
    .typeError('El campo cliente es requerido')
    .required('El campo cliente es requerido'),

  numero_contrato: yup
    .string()
    .typeError('El campo numero contrato es requerido')
    .required('El campo numero contrato es requerido'),

  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .required('El campo linea servicio es requerido'),

  departamento_asignado: yup
    .number()
    .typeError('El campo departamento asignado es requerido')
    .required('El campo departamento asignado es requerido'),

  aplica_beneficio_segun_perfil: yup
    .string()
    .typeError('El campo aplica beneficio segun perfil es requerido')
    .required('El campo aplica beneficio segun perfil es requerido'),
});

export const tareaFormSchema = yup.object({
  departamento_escalado: yup
    .number()
    .required('El campo departamento escalado prerechazo es requerido')
    .typeError('El campo departamento escalado prerechazo es requerido'),
  justificacion_escalamiento: yup
    .string()
    .optional()
    .nullable()
    .max(
      200,
      'El campo justificacion escalamiento no debe exceder los 200 caracteres',
    ),
});
