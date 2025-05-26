import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';
import { ZONA_SEMAFORO_ARRAY_CHOICES } from '@/shared/constants';

export const zonaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  has_coverage: yup
    .boolean()
    .typeError('El campo has coverage es requerido')
    .required('El campo has coverage es requerido'),
  uid: yup
    .boolean()
    .typeError('El campo UID es requerido')
    .required('El campo UID coverage es requerido'),
  semaforo: yup
    .mixed()
    .oneOf(ZONA_SEMAFORO_ARRAY_CHOICES, 'El semaforo debe ser elegido')
    .required('El campo semaforo es requerido'),
  state: fieldStateYupValidation,

  pais: yup
    .number()
    .typeError('El campo pais es requerido')
    .required('El campo pais es requerido'),
  provincia: yup
    .number()
    .typeError('El campo provincia es requerido')
    .required('El campo provincia es requerido'),
  ciudad: yup
    .number()
    .typeError('El campo ciudad es requerido')
    .required('El campo ciudad es requerido'),
});
