import * as yup from 'yup';

export const alquilerFormSchema = yup.object({
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(255, 'El campo descripcion no debe exceder los 255 caracteres'),
  fecha_inicio: yup.string().required('El campo fecha inicio es requerido'),
  fecha_fin: yup.string().required('El campo fecha inicio es requerido'),
  es_indefinido: yup
    .boolean()
    .typeError('El estado es Indefinido es Requerido')
    .required('El estado es Indefinido es Requerido'),
  total_cuotas: yup
    .number()
    .typeError('El campo total cuotas es requerido')
    .required('El campo total cuotas es requerido'),
  cuota_actual: yup
    .number()
    .typeError('El campo cuota actual es requerido')
    .required('El campo cuota actual es requerido'),
  valor_base_cuota: yup
    .string()
    .required('El campo valor base cuota es requerido'),

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
