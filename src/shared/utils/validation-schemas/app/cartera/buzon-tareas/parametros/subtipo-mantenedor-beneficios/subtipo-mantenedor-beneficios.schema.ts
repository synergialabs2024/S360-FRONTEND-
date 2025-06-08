import * as yup from 'yup';

export const subtipoMantenedorBeneficiosFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),

  // description: yup
  //   .string()
  //   .typeError('El campo descripcion es requerido')
  //   .required('El campo descripcion es requerido'),

  // motivo: yup
  //   .string()
  //   .typeError('El campo motivo es requerido')
  //   .required('El campo motivo es requerido'),

  causa: yup
    .string()
    .typeError('El campo causa es requerido')
    .required('El campo causa es requerido'),

  solucion: yup
    .string()
    .typeError('El campo solucion es requerido')
    .required('El campo solucion es requerido'),

  tipo_mantenedor_beneficio: yup
    .string()
    .typeError('El campo tipo mantenedor beneficio es requerido')
    .required('El campo tipo mantenedor beneficio es requerido'),
});
