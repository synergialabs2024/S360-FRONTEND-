import * as yup from 'yup';
import { fieldStateYupValidation } from '../common';

export const productoFormSchema = yup.object().shape({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  codigo: yup
    .string()
    .required('El campo código es requerido')
    .max(200, 'El campo código no debe exceder los 200 caracteres'),
  codigo_auxiliar: yup
    .string()
    .required('El campo código auxiliar es requerido')
    .max(200, 'El campo código auxiliar no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  descripcion: yup
    .string()
    .required('El campo descripción es requerido')
    .max(200, 'El campo descripción no debe exceder los 200 caracteres'),
  es_para_venta: yup
    .boolean()
    .typeError('El campo es para venta es requerido')
    .required('El campo es para venta es requerido'),
  tipo: yup.string().optional().nullable(),
  iva: yup
    .number()
    .typeError('El campo IVA es requerido')
    .required('El campo IVA es requerido'),
  categoria: yup
    .number()
    .typeError('El campo categoría es requerido')
    .required('El campo categoría es requerido'),

  // ======================================
  // validate prices array
  precios: yup
    .array()
    .of(
      yup.object().shape({
        nombre: yup
          .string()
          .required('El nombre del precio es requerido')
          .max(200, 'El nombre del precio no debe exceder los 200 caracteres'),
        valor: yup
          .number()
          .typeError('El valor debe ser un número')
          .required('El valor es requerido')
          .min(0, 'El valor no debe ser negativo'),
        default: yup.boolean().required(),
        descripcion: yup
          .string()
          .max(200, 'La descripción no debe exceder los 200 caracteres')
          .nullable(),
      }),
    )
    .min(1, 'Debe haber al menos un precio')
    .test(
      'one-default',
      'Debe haber exactamente un precio marcado como default',
      precios => {
        const defaultCount =
          precios?.filter(precio => precio.default).length || 0;
        return defaultCount === 1;
      },
    ),
});
