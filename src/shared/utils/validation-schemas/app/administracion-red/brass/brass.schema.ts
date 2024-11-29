import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const brassFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(245, 'El campo name no debe exceder los 245 caracteres'),
  state: fieldStateYupValidation,
  ip: yup.string().required('El campo ip es requerido'),
  username: yup
    .string()
    .required('El campo username es requerido')
    .max(255, 'El campo username no debe exceder los 255 caracteres'),
  password: yup
    .string()
    .required('El campo password es requerido')
    .max(255, 'El campo password no debe exceder los 255 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(255, 'El campo direccion no debe exceder los 255 caracteres'),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(255, 'El campo coordenadas no debe exceder los 255 caracteres'),

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
});
