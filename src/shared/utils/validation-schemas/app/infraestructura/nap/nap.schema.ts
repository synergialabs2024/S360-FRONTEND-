import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const napFormSchema = yup.object({
  state: fieldStateYupValidation,
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(200, 'El campo direccion no debe exceder los 200 caracteres'),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),

  es_soterrado: yup
    .boolean()
    .typeError('El campo es soterrado es requerido')
    .required('El campo es soterrado es requerido'),

  // CHOICE
  status_nap: yup
    .string()
    .required('El campo status nap es requerido')
    .max(200, 'El campo status nap no debe exceder los 200 caracteres'),

  proyecto_cod: yup
    .string()
    .required('El campo proyecto cod es requerido')
    .max(200, 'El campo proyecto cod no debe exceder los 200 caracteres'),

  ///* fk
  nodo: yup
    .number()
    .typeError('El campo nodo es requerido')
    .required('El campo nodo es requerido'),
  olt: yup
    .number()
    .typeError('El campo olt es requerido')
    .required('El campo olt es requerido'),
  ciudad: yup
    .number()
    .typeError('El campo ciudad es requerido')
    .required('El campo ciudad es requerido'),
  sector: yup
    .number()
    .typeError('El campo sector es requerido')
    .required('El campo sector es requerido'),
});
