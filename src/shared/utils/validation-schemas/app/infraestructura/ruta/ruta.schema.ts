import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const rutaFormSchema = yup.object({
  state: fieldStateYupValidation,
  status: yup.string().required('El campo status es requerido'),
});
