import * as yup from 'yup';

export const soporteTecnicoFormSchema = yup.object({
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(20, 'El campo celular no debe exceder los 20 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(255, 'El campo email no debe exceder los 255 caracteres'),
  direccion_referencia: yup
    .string()
    .required('El campo direccion referencia es requerido')
    .max(
      255,
      'El campo direccion referencia no debe exceder los 255 caracteres',
    ),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),
});
