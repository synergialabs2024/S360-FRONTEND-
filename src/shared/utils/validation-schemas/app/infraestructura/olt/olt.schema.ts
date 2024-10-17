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
  version: yup
    .string()
    .required('El campo version es requerido')
    .max(70, 'El campo version no debe exceder los 70 caracteres'),
  location: yup
    .string()
    .required('El campo location es requerido')
    .max(70, 'El campo location no debe exceder los 70 caracteres'),
  hostname: yup
    .string()
    .required('El campo hostname es requerido')
    .max(100, 'El campo hostname no debe exceder los 100 caracteres'),
  puerto: yup
    .number()
    .typeError('El campo puerto es requerido')
    .required('El campo puerto es requerido'),
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(700, 'El campo descripcion no debe exceder los 700 caracteres'),
  user: yup
    .string()
    .required('El campo user es requerido')
    .max(255, 'El campo user no debe exceder los 255 caracteres'),
  password: yup
    .string()
    .required('El campo password es requerido')
    .max(100, 'El campo password no debe exceder los 100 caracteres'),
  snmp_community: yup
    .string()
    .required('El campo snmp_community es requerido')
    .max(50, 'El campo snmp_community no debe exceder los 50 caracteres'),
  snmp_version: yup
    .number()
    .oneOf([1, 2, 3], 'El campo snmp_version solo puede ser 1, 2 o 3')
    .typeError('El campo snmp_version es requerido')
    .required('El campo snmp_version es requerido'),
  snmp_port: yup
    .number()
    .typeError('El campo snmp_port es requerido')
    .required('El campo snmp_port es requerido'),
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
