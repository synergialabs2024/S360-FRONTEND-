import * as yup from 'yup';

export const alquilerFormSchema = yup.object({
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(255, 'El campo descripcion no debe exceder los 255 caracteres'),
  tipo_recurrencia: yup
    .string()
    .required('El campo tipo recurrencia es requerido'),
  valor_base_cuota: yup.string().required('El campo monto es requerido'),
  total_cuotas: yup
    .number()
    .typeError('El campo total cuotas es requerido')
    .required('El campo total cuotas es requerido'),

  //* fk
  producto: yup
    .number()
    .typeError('El campo producto es requerido')
    .required('El campo producto es requerido'),
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
