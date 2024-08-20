import * as yup from 'yup';

export const preventaFormSchema = yup.object({
  es_referido: yup
    .boolean()
    .typeError('El campo es referido es requerido')
    .required('El campo es referido es requerido'),
  cliente_refiere: yup
    .string()
    .required('El campo cliente refiere es requerido')
    .max(200, 'El campo cliente refiere no debe exceder los 200 caracteres'),
  correo_cliente_refiere: yup
    .string()
    .required('El campo correo cliente refiere es requerido')
    .max(
      200,
      'El campo correo cliente refiere no debe exceder los 200 caracteres',
    ),

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
    .required('El campo celular de la persona de referencia es requerido')
    .max(
      200,
      'El campo celular de la persona de referencia no debe exceder los 200 caracteres',
    ),

  numero_cuenta_bancaria: yup
    .string()
    .required('El campo numero cuenta bancaria es requerido')
    .max(
      200,
      'El campo numero cuenta bancaria no debe exceder los 200 caracteres',
    ),
  costo_instalacion: yup
    .string()
    .required('El campo costo instalacion es requerido')
    .max(200, 'El campo costo instalacion no debe exceder los 200 caracteres'),

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
