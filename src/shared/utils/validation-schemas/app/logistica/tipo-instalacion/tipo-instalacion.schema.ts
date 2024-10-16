import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const tipoInstalacionFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(255, 'El campo name no debe exceder los 255 caracteres'),
  codigo: yup
    .string()
    .required('El campo Codigo es requerido')
    .max(255, 'El campo Codigo no debe exceder los 255 caracteres'),
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(810, 'El campo descripcion no debe exceder los 810 caracteres'),
  state: fieldStateYupValidation,
});
