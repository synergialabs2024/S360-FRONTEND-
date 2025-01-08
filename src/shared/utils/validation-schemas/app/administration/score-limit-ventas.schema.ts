import * as yup from 'yup';

import { SCORE_BURO_ARRAY_CHOICES } from '@/shared/constants';
import { fieldStateYupValidation } from '../common';

export const scoreLimitVentasFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  state: fieldStateYupValidation,
  score_letter: yup
    .string()
    .required('El campo score letter es requerido')
    .max(200, 'El campo score letter no debe exceder los 200 caracteres')
    .test(
      'is-valid-score-letter',
      'El campo score letter no es válido',
      value => SCORE_BURO_ARRAY_CHOICES.includes(value as any),
    ),

  monthly_limit: yup
    .number()
    .typeError('El campo monthly limit es requerido')
    .required('El campo monthly limit es requerido'),
});
