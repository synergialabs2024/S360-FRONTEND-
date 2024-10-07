import * as yup from 'yup';
import { fieldStateYupValidation } from '../common';

export const productoFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  codigo: yup
    .string()
    .required('El campo codigo es requerido')
    .max(200, 'El campo codigo no debe exceder los 200 caracteres'),
  codigo_auxiliar: yup
    .string()
    .required('El campo codigo auxiliar es requerido')
    .max(200, 'El campo codigo auxiliar no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(200, 'El campo descripcion no debe exceder los 200 caracteres'),
  es_para_venta: yup
    .boolean()
    .typeError('El campo es para venta es requerido')
    .required('El campo es para venta es requerido'),
  tipo: yup.string().optional().nullable(),
  iva: yup
    .number()
    .typeError('El campo iva es requerido')
    .required('El campo iva es requerido'),
  categoria: yup
    .number()
    .typeError('El campo categoria es requerido')
    .required('El campo categoria es requerido'),
});
