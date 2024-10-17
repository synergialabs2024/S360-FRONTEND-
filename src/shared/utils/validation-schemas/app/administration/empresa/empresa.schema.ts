import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const empresaFormSchema = yup.object({
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
  commercial_name: yup
    .string()
    .required('El campo commercial name es requerido')
    .max(200, 'El campo commercial name no debe exceder los 200 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(200, 'El campo email no debe exceder los 200 caracteres'),
  address: yup
    .string()
    .required('El campo address es requerido')
    .max(200, 'El campo address no debe exceder los 200 caracteres'),
  phone_1: yup
    .string()
    .required('El campo phone 1 es requerido')
    .max(200, 'El campo phone 1 no debe exceder los 200 caracteres'),
  phone_2: yup
    .string()
    .required('El campo phone 2 es requerido')
    .max(200, 'El campo phone 2 no debe exceder los 200 caracteres'),
  phone_3: yup
    .string()
    .required('El campo phone 3 es requerido')
    .max(200, 'El campo phone 3 no debe exceder los 200 caracteres'),
  logo_url: yup
    .string()
    .required('El campo logo url es requerido')
    .max(200, 'El campo logo url no debe exceder los 200 caracteres'),
  is_agente_retencion: yup
    .boolean()
    .typeError('El campo is agente retencion es requerido')
    .required('El campo is agente retencion es requerido'),
  number_agente_retencion: yup
    .number()
    .typeError('El campo number agente retencion es requerido')
    .required('El campo number agente retencion es requerido'),
  razon_social_representante: yup
    .string()
    .required('El campo razon social representante es requerido')
    .max(
      200,
      'El campo razon social representante no debe exceder los 200 caracteres',
    ),
  identificacion_representante: yup
    .string()
    .required('El campo identificacion representante es requerido')
    .max(
      200,
      'El campo identificacion representante no debe exceder los 200 caracteres',
    ),
  email_representante: yup
    .string()
    .required('El campo email representante es requerido')
    .max(
      200,
      'El campo email representante no debe exceder los 200 caracteres',
    ),
  phone_representante: yup
    .string()
    .required('El campo phone representante es requerido')
    .max(
      200,
      'El campo phone representante no debe exceder los 200 caracteres',
    ),
  contador: yup
    .string()
    .required('El campo contador es requerido')
    .max(200, 'El campo contador no debe exceder los 200 caracteres'),
  genera_ats: yup
    .boolean()
    .typeError('El campo genera ats es requerido')
    .required('El campo genera ats es requerido'),
  state: fieldStateYupValidation,
});
