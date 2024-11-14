import * as yup from 'yup';

export const createRubroClienteFormSchema = yup.object({
  tipo_rubro: yup.string().required('El campo tipo rubro es requerido'),

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

  fecha_vencimiento: yup
    .string()
    .required('El campo fecha vencimiento es requerido')
    .max(200, 'El campo fecha vencimiento no debe exceder los 200 caracteres'),

  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .required('El campo linea servicio es requerido'),
});
