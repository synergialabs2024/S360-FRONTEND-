import * as yup from 'yup';

export const transaccionFormSchema = yup.object({
  monto: yup
    .string()
    .required('El campo monto es requerido')
    .max(200, 'El campo monto no debe exceder los 200 caracteres'),
  codigo_transaccion: yup
    .string()
    .required('El campo codigo transaccion es requerido')
    .max(200, 'El campo codigo transaccion no debe exceder los 200 caracteres'),
  rubro: yup
    .number()
    .typeError('El campo rubro es requerido')
    .required('El campo rubro es requerido'),
});
