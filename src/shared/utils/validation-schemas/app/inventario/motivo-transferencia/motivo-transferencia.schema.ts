import * as yup from 'yup';

export const motivoTransferenciaFormSchema = yup.object({
  nombre: yup
    .string()
    .typeError('El campo nombre es requerido')
    .required('El campo nombre es requerido')
    .max(100, 'El campo nombre no debe exceder los 100 caracteres'),
  codigo: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido')
    .max(100, 'El campo codigo no debe exceder los 100 caracteres'),
  descripcion: yup
    .string()
    .typeError('El campo descripcion es requerido')
    .required('El campo descripcion es requerido'),
  tipo: yup
    .string()
    .typeError('El campo tipo es requerido')
    .required('El campo tipo es requerido')
    .max(100, 'El campo tipo no debe exceder los 100 caracteres'),
});
