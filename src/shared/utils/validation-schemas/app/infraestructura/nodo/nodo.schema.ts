import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const nodoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(245, 'El campo name no debe exceder los 245 caracteres')
    .matches(/^\S*$/, 'Espacios no aceptados, separar por _'),
  state: fieldStateYupValidation,
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
