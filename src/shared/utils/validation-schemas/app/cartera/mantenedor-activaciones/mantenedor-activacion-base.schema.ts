import * as yup from 'yup';

export const mantenedorActivacionBaseFormSchema = yup.object({
  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),

  tiempo_bloqueo: yup
    .number()
    .typeError('El campo tiempo de bloqueo caso es requerido')
    .required('El campo tiempo de bloqueo caso es requerido')
    .min(1, 'El campo tiempo de bloqueo no debe ser menor a 1 caracter')
    .max(31, 'El campo tiempo de bloqueo no debe exceder los 31 caracteres'),

  tiempo_limite: yup
    .number()
    .typeError('El campo tiempo limite es requerido')
    .required('El campo tiempo limite es requerido')
    .min(1, 'El campo tiempo limite no debe ser menor a 1 caracter')
    .max(31, 'El campo tiempo limite no debe exceder los 31 caracteres'),

  incluye_facturacion: yup
    .string()
    .typeError('El campo incluye facturacion es requerido')
    .required('El campo incluye facturacion es requerido'),

  incluye_notificacion: yup
    .string()
    .typeError('El campo incluye notificacion es requerido')
    .required('El campo incluye notificacion es requerido'),

  motivo: yup
    .number()
    .typeError('El campo motivo es requerido')
    .required('El campo motivo es requerido'),
});
