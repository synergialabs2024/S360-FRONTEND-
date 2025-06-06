import * as yup from 'yup';

export const cambioOnuInventarioFormSchema = yup.object({
  serie_onu_nueva: yup
    .string()
    .required('El campo nueva serie es requerido')
    .max(200, 'El campo nueva serie no debe exceder los 200 caracteres'),
  producto_onu_nueva: yup
    .string()
    .required('El campo producto serie es requerido')
    .max(200, 'El campo producto serie no debe exceder los 200 caracteres'),
});
