import * as yup from 'yup';

import { SLOT_AGENDAMIENTO_ESTADOS_ARRAY_CHOICES } from '@/shared/constants';

export const planificadorFormSchema = yup.object({
  fecha: yup
    .string()
    .required('El campo fecha es requerido')
    .max(200, 'El campo fecha no debe exceder los 200 caracteres'),

  flota: yup
    .number()
    .typeError('El campo flota es requerido')
    .required('El campo flota es requerido'),
});

export const blockManyHoursSchema = yup.object({
  isUnblockRequest: yup.boolean().optional(),

  estado: yup
    .string()
    .required('El campo estado es requerido')
    .max(200, 'El campo estado no debe exceder los 200 caracteres')
    .oneOf(SLOT_AGENDAMIENTO_ESTADOS_ARRAY_CHOICES, 'El estado no es válido'),

  // motivo: yup
  //   .string()
  //   .optional()
  //   .when('isUnblockRequest', {
  //     is: true,
  //     then: schema => schema.required('Motivo es requerido'),
  //   })
  //   .max(255, 'El motivo no puede exceder los 255 caracteres'),
});
