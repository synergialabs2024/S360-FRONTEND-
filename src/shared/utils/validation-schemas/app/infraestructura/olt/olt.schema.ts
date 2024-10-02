import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const oLTFormSchema = yup.object({
  state: fieldStateYupValidation,

  name: yup
    .string()
    .required('El campo name es requerido')
    .max(245, 'El campo name no debe exceder los 245 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(255, 'El campo direccion no debe exceder los 255 caracteres'),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(255, 'El campo coordenadas no debe exceder los 255 caracteres'),
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(700, 'El campo descripcion no debe exceder los 700 caracteres'),
  puerto: yup
    .string()
    .required('El campo puerto es requerido')
    .max(100, 'El campo puerto no debe exceder los 100 caracteres'),
  hostname: yup
    .string()
    .required('El campo hostname es requerido')
    .max(100, 'El campo hostname no debe exceder los 100 caracteres'),
  password: yup
    .string()
    .required('El campo password es requerido')
    .max(100, 'El campo password no debe exceder los 100 caracteres'),
  user: yup
    .string()
    .required('El campo user es requerido')
    .max(255, 'El campo user no debe exceder los 255 caracteres'),
  puerto_ssh: yup
    .string()
    .required('El campo puerto_ssh es requerido')
    .max(255, 'El campo puerto_ssh no debe exceder los 255 caracteres'),
  comunidad_snmp: yup
    .string()
    .required('El campo comunidad_snmp es requerido')
    .max(255, 'El campo comunidad_snmp no debe exceder los 255 caracteres'),

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
