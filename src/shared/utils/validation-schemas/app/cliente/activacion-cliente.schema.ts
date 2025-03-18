import * as yup from 'yup';

export const activacionClienteFormSchema = yup.object({
  motivo: yup.number().required('El campo motivo es requerido'),
});
