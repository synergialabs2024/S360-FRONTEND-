import * as yup from 'yup';

export const motivoRubroAdicionalFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),
  codigo: yup
    .string()
    .required('El campo codigo es requerido')
    .max(200, 'El campo codigo no debe exceder los 200 caracteres'),
  valor: yup
    .string()
    .required('El campo valor es requerido')
    .max(200, 'El campo valor no debe exceder los 200 caracteres'),
  descripcion: yup.string().optional().nullable(),
});
