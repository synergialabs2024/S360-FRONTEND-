import * as yup from 'yup';

export const emailYupValidation = yup
  .string()
  .matches(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Correo electrónico inválido',
  )
  .required('El correo electrónico es requerido')
  .min(5, 'Min 5 caracteres')
  .max(48, 'Max 48 caracteres');

export const fieldStateYupValidation = yup
  .boolean()
  .typeError('El estado es Requerido')
  .required('El estado es Requerido');

export const descriptionYupValidation = yup
  .string()
  // .required('El campo description es requerido')
  .optional()
  .max(255, 'El campo description no debe exceder los 255 caracteres');
