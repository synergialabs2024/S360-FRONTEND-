import * as yup from 'yup';

export const ciudadFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),

  has_coverage: yup
    .boolean()
    .typeError('El campo has coverage es requerido')
    .required('El campo has coverage es requerido'),
  metraje_autorizado: yup
    .number()
    .optional()
    .nullable()
    .when('has_coverage', {
      is: true,
      then: schema =>
        schema
          .required('El campo metraje autorizado es requerido')
          .typeError('El campo metraje autorizado es requerido')
          .min(0, 'Debe ser mayor o igual que 0'),
    }),
  precio_metraje_excedido: yup
    .number()
    .optional()
    .nullable()
    .when('has_coverage', {
      is: true,
      then: schema =>
        schema
          .required('El campo precio metraje excedido es requerido')
          .typeError('El campo precio metraje excedido es requerido')
          .min(0, 'Debe ser mayor o igual que 0'),
    }),

  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),

  pais: yup
    .number()
    .typeError('El campo pais es requerido')
    .required('El campo pais es requerido'),
  provincia: yup
    .number()
    .typeError('El campo provincia es requerido')
    .required('El campo provincia es requerido'),
});
