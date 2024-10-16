import * as yup from 'yup';

export const systemGroupFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  description: yup
    .string()
    .optional()
    .max(200, 'El campo description no debe exceder los 200 caracteres'),

  // system_modules: yup
  //   .array()
  //   .of(yup.string())
  //   .required('El campo system_modules es requerido'),
  // permissions: yup
  //   .array()
  //   .of(yup.number())
  //   .required('El campo permissions es requerido'),
});
