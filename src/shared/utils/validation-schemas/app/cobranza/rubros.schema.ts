import * as yup from 'yup';

export const rubroFormSchema = yup.object({
  id: yup
    .number()
    .typeError('El campo id es requerido')
    .required('El campo id es requerido'),
  tipo_rubro: yup.string().required('El campo tipo rubro es requerido'),
  estado_rubro: yup.string().required('El campo estado rubro es requerido'),
  concepto: yup
    .string()
    .required('El campo concepto es requerido')
    .max(200, 'El campo concepto no debe exceder los 200 caracteres'),
  subtotal: yup
    .string()
    .required('El campo subtotal es requerido')
    .max(200, 'El campo subtotal no debe exceder los 200 caracteres'),
  valor_taxes: yup
    .string()
    .required('El campo valor taxes es requerido')
    .max(200, 'El campo valor taxes no debe exceder los 200 caracteres'),
  valor_total: yup
    .string()
    .required('El campo valor total es requerido')
    .max(200, 'El campo valor total no debe exceder los 200 caracteres'),
  valor_ice: yup
    .string()
    .required('El campo valor ice es requerido')
    .max(200, 'El campo valor ice no debe exceder los 200 caracteres'),
  valor_pagado: yup
    .string()
    .required('El campo valor pagado es requerido')
    .max(200, 'El campo valor pagado no debe exceder los 200 caracteres'),
  fecha_pago: yup
    .string()
    .required('El campo fecha pago es requerido')
    .max(200, 'El campo fecha pago no debe exceder los 200 caracteres'),
  fecha_emision: yup
    .string()
    .required('El campo fecha emision es requerido')
    .max(200, 'El campo fecha emision no debe exceder los 200 caracteres'),
  fecha_vencimiento: yup
    .string()
    .required('El campo fecha vencimiento es requerido')
    .max(200, 'El campo fecha vencimiento no debe exceder los 200 caracteres'),
  cliente: yup
    .number()
    .typeError('El campo cliente es requerido')
    .required('El campo cliente es requerido'),
  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .required('El campo linea servicio es requerido'),
  contrato: yup
    .number()
    .typeError('El campo contrato es requerido')
    .required('El campo contrato es requerido'),
});
