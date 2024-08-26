import * as yup from 'yup';

export const preventaFormSchema = yup.object({
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
    .required('El campo celular adicional es requerido')
    .max(200, 'El campo celular adicional no debe exceder los 200 caracteres'),

  ///* fk ---------------------------
  tipo_servicio: yup
    .string()
    .required('El campo tipo servicio es requerido')
    .max(200, 'El campo tipo servicio no debe exceder los 200 caracteres'),
  tipo_plan: yup
    .string()
    .required('El campo tipo plan es requerido')
    .max(200, 'El campo tipo plan no debe exceder los 200 caracteres'),
  metodo_pago: yup
    .number()
    .typeError('El campo metodo pago es requerido')
    .optional()
    .nullable(),
  entidad_financiera: yup
    .number()
    .typeError('El campo entidad financiera es requerido')
    .optional()
    .nullable(),
});
