import * as yup from 'yup';

export const oltConectFormSchema = yup.object({
  uuid: yup.string().required('El campo name es requerido'),
});
