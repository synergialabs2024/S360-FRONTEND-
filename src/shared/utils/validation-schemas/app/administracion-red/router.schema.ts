import * as yup from 'yup';
import { fieldStateYupValidation } from '../common';

export const routerFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  state: fieldStateYupValidation,
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  ip: yup
    .string()
    .required('El campo ip es requerido')
    .max(200, 'El campo ip no debe exceder los 200 caracteres'),
  username: yup
    .string()
    .required('El campo username es requerido')
    .max(200, 'El campo username no debe exceder los 200 caracteres'),
  password: yup
    .string()
    .required('El campo password es requerido')
    .max(200, 'El campo password no debe exceder los 200 caracteres'),
  usuario_api: yup
    .string()
    .required('El campo usuario api es requerido')
    .max(200, 'El campo usuario api no debe exceder los 200 caracteres'),
  puerto_api: yup
    .number()
    .typeError('El campo puerto api es requerido')
    .required('El campo puerto api es requerido'),
  clave_api: yup
    .string()
    .required('El campo clave api es requerido')
    .max(200, 'El campo clave api no debe exceder los 200 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(200, 'El campo direccion no debe exceder los 200 caracteres'),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),

  tipo_router: yup
    .string()
    .required('El campo tipo router es requerido')
    .max(200, 'El campo tipo router no debe exceder los 200 caracteres'),
  nodo: yup
    .number()
    .typeError('El campo nodo es requerido')
    .required('El campo nodo es requerido'),
  olt: yup
    .number()
    .typeError('El campo olt es requerido')
    .required('El campo olt es requerido'),
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
