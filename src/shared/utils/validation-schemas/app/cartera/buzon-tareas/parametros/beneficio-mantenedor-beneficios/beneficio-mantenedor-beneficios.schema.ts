import * as yup from 'yup';

export const beneficioMantenedorBeneficiosFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),

  description: yup
    .string()
    .typeError('El campo descripcion es requerido')
    .required('El campo descripcion es requerido'),

  aplica_descuento_meses_posterior: yup
    .string()
    .typeError('El campo aplica descuento meses posterior es requerido')
    .required('El campo aplica descuento meses posterior es requerido'),

  aplica_descuento_meses_curso: yup
    .string()
    .typeError('El campo aplica descuento meses curso es requerido')
    .required('El campo aplica descuento meses curso es requerido'),

  discapacidad: yup
    .string()
    .typeError('El campo discapacidad es requerido')
    .required('El campo discapacidad es requerido'),

  tercera_edad: yup
    .string()
    .typeError('El campo tercera edad es requerido')
    .required('El campo tercera edad es requerido'),

  plan_desarrollo_humano: yup
    .string()
    .typeError('El campo plan desarrollo humano es requerido')
    .required('El campo plan desarrollo humano es requerido'),

  plan_retencion: yup
    .string()
    .typeError('El campo plan retencion es requerido')
    .required('El campo plan retencion es requerido'),

  categorizacion_perfil: yup
    .string()
    .typeError('El campo categorizacion perfil es requerido')
    .required('El campo categorizacion perfil es requerido'),

  categorizacion_pagos: yup
    .string()
    .typeError('El campo categorizacion pagos es requerido')
    .required('El campo categorizacion pagos es requerido'),

  tipo_mantenedor_beneficio: yup
    .number()
    .typeError('El campo tipo es requerido')
    .required('El campo tipo es requerido'),

  subtipo_mantenedor_beneficio: yup
    .number()
    .typeError('El campo subtipo mantenedor beneficio es requerido')
    .required('El campo subtipo mantenedor beneficio es requerido'),

  metodos_pago: yup
    .array()
    .typeError('El campo forma de pago es requerido')
    .required('El campo forma de pago es requerido'),

  planes_internet: yup
    .array()
    .typeError('El campo planes es requerido')
    .required('El campo planes es requerido'),

  zonas: yup
    .array()
    .typeError('El campo zonas es requerido')
    .required('El campo zonas es requerido'),

  canales_venta: yup
    .array()
    .typeError('El campo canal de venta es requerido')
    .required('El campo canal de venta es requerido'),

  /* productos: yup
    .string()
    .typeError('El campo productos es requerido')
    .required('El campo productos es requerido'), */
});
