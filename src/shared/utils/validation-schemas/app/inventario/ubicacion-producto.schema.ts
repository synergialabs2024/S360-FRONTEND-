import * as yup from 'yup';
import { fieldStateYupValidation } from '../common';

export const ubicacionProductoFormSchema = yup.object({
  state: fieldStateYupValidation,

  stock_minimo: yup
    .number()
    .typeError('El campo stock minimo es requerido')
    .required('El campo stock minimo es requerido'),
  stock_maximo: yup
    .number()
    .typeError('El campo stock maximo es requerido')
    .required('El campo stock maximo es requerido'),
  stock_critico: yup
    .number()
    .typeError('El campo stock critico es requerido')
    .required('El campo stock critico es requerido'),
  stock_actual: yup
    .number()
    .typeError('El campo stock actual es requerido')
    .required('El campo stock actual es requerido'),

  bodega: yup
    .number()
    .typeError('El campo bodega es requerido')
    .required('El campo bodega es requerido'),
  ubicacion: yup
    .number()
    .typeError('El campo ubicacion es requerido')
    .required('El campo ubicacion es requerido'),
  producto: yup
    .number()
    .typeError('El campo producto es requerido')
    .required('El campo producto es requerido'),
});
