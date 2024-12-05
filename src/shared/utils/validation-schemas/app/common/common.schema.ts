/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const emailYupValidation = yup
  .string()
  .matches(
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

export const fieldPoolIpV4YupValidation = yup
  .string()
  .matches(
    /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
    'Direccion IPv4 inválida',
  )
  .required('El pool de IP es Requerido')
  .max(50, 'El pool de IP debe tener como máximo 50 caracteres');

export const fieldPoolIpV6YupValidation = yup
  .string()
  .matches(
    /^(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:))(?:\/\d{1,3})?$/,
    'Dirección IPv6 inválida',
  )
  .required('El pool de IPv6 es requerido')
  .max(50, 'El pool de IPv6 debe tener como máximo 50 caracteres');
