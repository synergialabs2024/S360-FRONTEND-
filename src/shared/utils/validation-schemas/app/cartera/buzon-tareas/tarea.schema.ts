import * as yup from 'yup';

export const tareaGestionadaFormSchema = yup.object({
  beneficio: yup
    .string()
    .typeError('El campo beneficio referencia es requerido')
    .required('El campo beneficio referencia es requerido'),

  aplica_beneficio_solucion: yup
    .string()
    .typeError('El campo aplica_beneficio_solucion caso es requerido')
    .required('El campo aplica_beneficio_solucion caso es requerido'),

  detalle_solucion: yup
    .string()
    .typeError('El campo detalle_solucion tarea es requerido')
    .required('El campo detalle_solucion tarea es requerido'),

  beneficio_aplicado: yup
    .string()
    .typeError('El campo beneficio aplicado tarea es requerido')
    .required('El campo aplica beneficio tarea es requerido'),

  solucion_tarea: yup
    .number()
    .typeError('El campo solucion_tarea tarea es requerido')
    .required('El campo solucion_tarea tarea es requerido'),
});
