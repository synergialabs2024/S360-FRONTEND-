import * as yup from 'yup';

export const authOnuFormSchema = yup.object({
  sn: yup
    .string()
    .required('El campo sn es requerido')
    .max(100, 'El campo sn no debe exceder los 100 caracteres'),
});
