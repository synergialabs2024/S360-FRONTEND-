import * as yup from 'yup';

export const solicitudAprobacionIAPreventaFormSchema = yup.object({
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(200, 'El campo descripcion no debe exceder los 200 caracteres'),
});
