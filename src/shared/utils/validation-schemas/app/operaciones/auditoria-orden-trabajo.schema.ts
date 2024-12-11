import * as yup from 'yup';

export const requestUpdOTAuditoriaFormSchema = yup.object({
  motivo_correccion: yup
    .string()
    .required('El motivo de corrección es requerido'),
  observacion_correccion: yup
    .string()
    .optional()
    .nullable()
    .max(655, 'Máximo 655 caracteres'),
});
