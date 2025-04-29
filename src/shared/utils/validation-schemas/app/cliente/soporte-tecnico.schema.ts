import * as yup from 'yup';

export const soporteTecnicoFormSchema = yup.object({
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(20, 'El campo celular no debe exceder los 20 caracteres'),
  email: yup
    .string()
    .required('El campo celular es requerido')
    .max(255, 'El campo celular no debe exceder los 255 caracteres'),
  direccion_referencia: yup
    .string()
    .required('El campo celular es requerido')
    .max(255, 'El campo celular no debe exceder los 255 caracteres'),
});
