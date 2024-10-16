import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const promocionFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  tipo_descuento: yup
    .string()
    .required('El campo tipo descuento es requerido')
    .max(200, 'El campo tipo descuento no debe exceder los 200 caracteres'),
  valor_descuento: yup
    .string()
    .required('El campo valor descuento es requerido')
    .max(200, 'El campo valor descuento no debe exceder los 200 caracteres')
    // is between 0 and 100
    .test(
      'is-between-0-100',
      'El campo valor descuento debe ser un número entre 0 y 100',
      value => {
        if (value) {
          return parseFloat(value) >= 0 && parseFloat(value) <= 100;
        }
        return true;
      },
    ),
  fecha_inicio: yup
    .string()
    .required('El campo fecha inicio es requerido')
    .max(200, 'El campo fecha inicio no debe exceder los 200 caracteres'),
  fecha_fin: yup
    .string()
    .optional()
    .nullable()
    .max(200, 'El campo fecha fin no debe exceder los 200 caracteres'),
  prioridad: yup
    .number()
    .typeError('El campo prioridad es requerido')
    .required('El campo prioridad es requerido'),
  recurrencia: yup
    .string()
    .required('El campo recurrencia es requerido')
    .max(200, 'El campo recurrencia no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,

  paises: yup.array().optional().nullable(),
  provincias: yup.array().optional().nullable(),
  ciudades: yup.array().optional().nullable(),
  zonas: yup.array().optional().nullable(),
  sectores: yup.array().optional().nullable(),
  canales_venta: yup.array().optional().nullable(),
  planes: yup.array().optional().nullable(),
  meses_gratis: yup.array().optional().nullable(),
  meses_descuento: yup.array().optional().nullable(),
});
