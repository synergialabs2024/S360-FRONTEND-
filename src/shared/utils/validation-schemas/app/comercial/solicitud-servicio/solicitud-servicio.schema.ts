import * as yup from 'yup';

export const solicitudServicioFormSchema = yup.object({
  estado_solicitud: yup
    .string()
    .required('El campo estado solicitud es requerido')
    .max(200, 'El campo estado solicitud no debe exceder los 200 caracteres'),

  tipo_identificacion: yup
    .string()
    .required('El campo tipo identificacion es requerido')
    .max(
      200,
      'El campo tipo identificacion no debe exceder los 200 caracteres',
    ),
  identificacion: yup
    .string()
    .required('El campo identificacion es requerido')
    .max(200, 'El campo identificacion no debe exceder los 200 caracteres'),
  razon_social: yup
    .string()
    .required('El campo razon social es requerido')
    .max(200, 'El campo razon social no debe exceder los 200 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(200, 'El campo email no debe exceder los 200 caracteres'),
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(200, 'El campo celular no debe exceder los 200 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(200, 'El campo direccion no debe exceder los 200 caracteres'),
  es_discapacitado: yup
    .boolean()
    .typeError('El campo es discapacitado es requerido')
    .required('El campo es discapacitado es requerido'),
  es_tercera_edad: yup
    .boolean()
    .typeError('El campo es tercera edad es requerido')
    .required('El campo es tercera edad es requerido'),
  es_cliente: yup
    .boolean()
    .typeError('El campo es cliente es requerido')
    .required('El campo es cliente es requerido'),

  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .required('El campo linea servicio es requerido'),

  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),
  tiene_cobertura: yup
    .boolean()
    .typeError('El campo tiene cobertura es requerido')
    .required('El campo tiene cobertura es requerido'),

  // EQUIFAX -----------
  categoria_score_desicion: yup
    .string()
    .required('El campo categoria score desicion es requerido')
    .max(
      200,
      'El campo categoria score desicion no debe exceder los 200 caracteres',
    ),
  valor_maximo: yup
    .string()
    .required('El campo valor maximo es requerido')
    .max(200, 'El campo valor maximo no debe exceder los 200 caracteres'),
  valor_minimo: yup
    .string()
    .required('El campo valor minimo es requerido')
    .max(200, 'El campo valor minimo no debe exceder los 200 caracteres'),
  score_inclusion: yup
    .string()
    .required('El campo score inclusion es requerido')
    .max(200, 'El campo score inclusion no debe exceder los 200 caracteres'),
  score_sobreendeudamiento: yup
    .string()
    .required('El campo score sobreendeudamiento es requerido')
    .max(
      200,
      'El campo score sobreendeudamiento no debe exceder los 200 caracteres',
    ),
  score_servicios: yup
    .string()
    .required('El campo score servicios es requerido')
    .max(200, 'El campo score servicios no debe exceder los 200 caracteres'),
  rango_capacidad_pago: yup
    .string()
    .required('El campo rango capacidad pago es requerido')
    .max(
      200,
      'El campo rango capacidad pago no debe exceder los 200 caracteres',
    ),
});
