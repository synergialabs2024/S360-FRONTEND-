import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const oLTFormSchema = yup.object({
  state: fieldStateYupValidation,

  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(200, 'El campo direccion no debe exceder los 200 caracteres'),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(200, 'El campo descripcion no debe exceder los 200 caracteres'),
  puerto: yup
    .string()
    .required('El campo puerto es requerido')
    .max(200, 'El campo puerto no debe exceder los 200 caracteres'),
  hostname: yup
    .string()
    .required('El campo hostname es requerido')
    .max(200, 'El campo hostname no debe exceder los 200 caracteres'),
  password: yup
    .string()
    .required('El campo password es requerido')
    .max(200, 'El campo password no debe exceder los 200 caracteres'),
  user: yup
    .string()
    .required('El campo user es requerido')
    .max(200, 'El campo user no debe exceder los 200 caracteres'),
  pppoe: yup
    .string()
    .required('El campo pppoe es requerido')
    .max(200, 'El campo pppoe no debe exceder los 200 caracteres'),
  ip_pppoe: yup
    .string()
    .required('El campo ip pppoe es requerido')
    .max(200, 'El campo ip pppoe no debe exceder los 200 caracteres'),

  nodo: yup
    .number()
    .typeError('El campo nodo es requerido')
    .required('El campo nodo es requerido'),
  pais: yup
    .number()
    .typeError('El campo pais es requerido')
    .required('El campo pais es requerido'),
  provincia: yup
    .number()
    .typeError('El campo provincia es requerido')
    .required('El campo provincia es requerido'),
  ciudad: yup
    .number()
    .typeError('El campo ciudad es requerido')
    .required('El campo ciudad es requerido'),
  zona: yup
    .number()
    .typeError('El campo zona es requerido')
    .required('El campo zona es requerido'),
  sector: yup
    .number()
    .typeError('El campo sector es requerido')
    .required('El campo sector es requerido'),
});
