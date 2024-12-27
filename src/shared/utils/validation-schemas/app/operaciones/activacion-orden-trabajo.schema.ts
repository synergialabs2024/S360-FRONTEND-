import * as yup from 'yup';

export const activacionInstallOTSchema = yup.object({
  hora_inicio: yup
    .string()
    .required('La hora de inicio de instalación es requerida'),
  hora_fin: yup.string().required('La hora de fin de instalación es requerida'),

  observacion_activacion: yup
    .string()
    .optional()
    .nullable()
    .max(655, 'Máximo 655 caracteres'),
});
