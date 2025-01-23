import * as yup from 'yup';

import { IdentificationTypeEnumChoice } from '@/shared/constants';
import { validarCedulaEcuador } from '@/shared/utils/validators';
import { emailYupValidationOptional } from '../../common';

export const cambioPlanFormSchema = yup.object({
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
    .max(200, 'El campo identificacion no debe exceder los 200 caracteres')
    .when('tipo_identificacion', {
      is: IdentificationTypeEnumChoice.CEDULA,
      then: schema =>
        schema.test('validar-cedula', 'Cédula inválida', value =>
          validarCedulaEcuador(value),
        ),
    }),
  razon_social: yup
    .string()
    .required('El campo razon social es requerido')
    .max(200, 'El campo razon social no debe exceder los 200 caracteres'),
  email: emailYupValidationOptional,
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(200, 'El campo celular no debe exceder los 200 caracteres')
    .matches(/^(09)\d{8}$/, 'Número de celular inválido'),
  direccion_referencia: yup
    .string()
    .required('El campo direccion es requerido')
    .max(255, 'El campo direccion no debe exceder los 255 caracteres'),

  // direccion: yup
  //   .string()
  //   .required('El campo direccion es requerido')
  //   .max(38, 'El campo direccion no debe exceder los 38 caracteres'),
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

  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),
  tiene_cobertura: yup
    .boolean()
    .typeError('El campo tiene cobertura es requerido')
    .required('El campo tiene cobertura es requerido'),

  tipo_servicio: yup.string(),
  tipo_plan: yup.string(),

  //  coverage
  thereIsCoverage: yup.boolean().optional().nullable(),
  sector: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo sector es requerido')
    .when('thereIsCoverage', {
      is: true,
      then: schema => schema.required('El campo sector es requerido'),
    }),
});

export const cancelcambioPlanFormSchema = yup.object({
  motivo_rechazo: yup
    .number()
    .typeError('El campo motivo rechazo es requerido')
    .required('El campo motivo rechazo es requerido'),
  observacion_cancelacion: yup
    .string()
    .required('El campo observacion cancelacion es requerido')
    .max(
      255,
      'El campo observacion cancelacion no debe exceder los 255 caracteres',
    ),
});
