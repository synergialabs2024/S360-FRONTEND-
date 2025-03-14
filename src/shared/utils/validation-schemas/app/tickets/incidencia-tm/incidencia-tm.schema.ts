import { fieldStateYupValidation } from '../../common';
import * as yup from 'yup';

export const incidenciaTMFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(255, 'El campo nombre no debe exceder los 255 caracteres'),
  state: fieldStateYupValidation,
  prioridad: yup
    .mixed()
    .oneOf(
      ['ALTA', 'MEDIA', 'BAJA'],
      'La prioridad debe ser ALTA, MEDIA o BAJA',
    )
    .required('El campo prioridad es requerido'),
  restringir_asuntos_ticket: yup
    .boolean()
    .typeError('El campo restringir asuntos ticket es Requerido')
    .required('El campo restringir asuntos ticket es Requerido'),
});
