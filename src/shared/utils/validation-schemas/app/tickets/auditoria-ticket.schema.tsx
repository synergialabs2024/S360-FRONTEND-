import * as yup from 'yup';

export const requestTicketAuditoriaFormSchema = yup.object({
  motivo_rechazo: yup.string().required('El motivo de rechazo es requerido'),
});
