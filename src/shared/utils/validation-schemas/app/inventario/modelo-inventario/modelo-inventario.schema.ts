import * as yup from 'yup';

export const modeloInventarioFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(100, 'El campo nombre no debe exceder los 100 caracteres'),
  codigo: yup
    .string()
    .required('El campo codigo es requerido')
    .max(100, 'El campo codigo no debe exceder los 100 caracteres'),
});
