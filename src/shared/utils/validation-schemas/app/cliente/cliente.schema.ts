import * as yup from 'yup';

export const clienteFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),

  identificacion: yup
    .string()
    .required('El campo identificacion es requerido')
    .max(200, 'El campo identificacion no debe exceder los 200 caracteres'),
  razon_social: yup
    .string()
    .required('El campo razon social es requerido')
    .max(200, 'El campo razon social no debe exceder los 200 caracteres'),
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(200, 'El campo celular no debe exceder los 200 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(200, 'El campo email no debe exceder los 200 caracteres'),
  es_tercera_edad: yup
    .boolean()
    .typeError('El campo es tercera edad es requerido')
    .required('El campo es tercera edad es requerido'),
  es_discapacitado: yup
    .boolean()
    .typeError('El campo es discapacitado es requerido')
    .required('El campo es discapacitado es requerido'),
  is_installed: yup
    .boolean()
    .typeError('El campo is installed es requerido')
    .required('El campo is installed es requerido'),
  area: yup
    .number()
    .typeError('El campo area es requerido')
    .optional()
    .nullable(),
  departamento: yup
    .number()
    .typeError('El campo departamento es requerido')
    .optional()
    .nullable(),
  canal_venta: yup
    .number()
    .typeError('El campo canal venta es requerido')
    .optional()
    .nullable(),
  vendedor: yup
    .number()
    .typeError('El campo vendedor es requerido')
    .optional()
    .nullable(),
});
