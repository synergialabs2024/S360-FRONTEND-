import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const iVAFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),

  sri_code: yup
    .string()
    .required('El campo sri code es requerido')
    .max(200, 'El campo sri code no debe exceder los 200 caracteres'),

  percentage: yup
    .string()
    .required('El campo percentage es requerido')
    .test(
      'is-percentage',
      'El campo percentage debe ser un número válido y estar en el rango de [0, 100]',
      value => {
        if (!value) return true;

        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) return false;

        return parsedValue >= 0 && parsedValue <= 100;
      },
    ),
  state: fieldStateYupValidation,
});
