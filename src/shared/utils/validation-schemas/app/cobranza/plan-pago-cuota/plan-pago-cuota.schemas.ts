import * as yup from 'yup';

export const planPagoCuotaFormSchema = yup.object({
  estado_deuda: yup.string().required('El campo estado_deuda es requerido'),
  total_cuotas: yup
    .number()
    .typeError('El campo total cuotas es requerido')
    .required('El campo total cuotas es requerido'),
  monto_total: yup.string().required('El campo monto total es requerido'),
  fecha_fin: yup.string().required('El campo fecha fin es requerido'),
});
