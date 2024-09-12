import * as yup from 'yup';

export const servicioFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El campo name es requerido')
    .max(255, 'El campo name no debe exceder los 255 caracteres'),
  codigo: yup
    .string()
    .required('El campo name es requerido')
    .max(120, 'El campo name no debe exceder los 120 caracteres'),
  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),

  descripcion: yup
    .string()
    .typeError('El campo descripcion es requerido')
    .required('El campo descripcion es requerido')
    .max(720, 'El campo description no debe exceder los 720 caracteres'),
  precio: yup.string().required('El campo precio es requerido'),
  iva: yup
    .number()
    .typeError('El campo iva es requerido')
    .required('El campo iva es requerido'),
});
