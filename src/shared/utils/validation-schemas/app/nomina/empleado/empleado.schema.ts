import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const empleadoFormSchema = yup.object({
  razon_social: yup
    .string()
    .required('El campo razon social es requerido')
    .max(200, 'El campo razon social no debe exceder los 200 caracteres'),
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
  address: yup
    .string()
    .required('El campo address es requerido')
    .max(200, 'El campo address no debe exceder los 200 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(200, 'El campo email no debe exceder los 200 caracteres'),
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
  salary: yup
    .string()
    .required('El campo salary es requerido')
    .max(200, 'El campo salary no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  tipo_empleado: yup
    .string()
    .required('El campo tipo empleado es requerido')
    .max(200, 'El campo tipo empleado no debe exceder los 200 caracteres'),

  empresa: yup
    .number()
    .typeError('El campo empresa es requerido')
    .required('El campo empresa es requerido'),
  area: yup
    .number()
    .typeError('El campo area es requerido')
    .required('El campo area es requerido'),
  departamento: yup
    .number()
    .typeError('El campo departamento es requerido')
    .required('El campo departamento es requerido'),
  canal_venta: yup.string().optional().nullable(),
  cargo: yup
    .number()
    .typeError('El campo cargo es requerido')
    .required('El campo cargo es requerido'),
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
  // zona: yup
  //   .number()
  //   .optional()
  //   .nullable()
  //   .typeError('La zona debe tener el tipo correcto'),
  // sector: yup
  //   .number()
  //   .optional()
  //   .nullable()
  //   .typeError('El sector debe tener el tipo correcto'),
});
