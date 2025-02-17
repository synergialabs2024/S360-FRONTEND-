import * as yup from 'yup';

export const promesapagoFormSchema = yup.object({
  fecha_promesa_pago: yup
    .string()
    .typeError('El campo fecha promesa pago es requerido')
    .required('El campo fecha promesa pago es requerido'),
  observacion: yup
    .string()
    .required('El campo observacion pago es requerido')
    .max(200, 'El campo observacion pago no debe exceder los 200 caracteres'),
  numero_contrato: yup
    .string()
    .typeError('El campo numero contrato es requerido')
    .required('El campo numero contrato es requerido'),
});
