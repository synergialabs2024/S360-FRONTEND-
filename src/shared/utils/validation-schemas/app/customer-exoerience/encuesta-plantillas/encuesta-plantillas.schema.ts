import * as yup from 'yup';

export const EncuestaPlantillaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  description: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(200, 'El campo descripcion no debe exceder los 200 caracteres'),
});
