import * as yup from 'yup';

export const paisFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  iso_code: yup
    .string()
    .required('El campo iso code es requerido')
    .max(28, 'El campo iso code no debe exceder los 2 caracteres'),
  nationality: yup
    .string()
    .required('El campo nationality es requerido')
    .max(200, 'El campo nationality no debe exceder los 200 caracteres'),
  has_coverage: yup
    .boolean()
    .typeError('El campo has coverage es requerido')
    .required('El campo has coverage es requerido'),
  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),
});
