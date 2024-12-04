import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const primarynapFormSchema = yup.object({
  state: fieldStateYupValidation,
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(245, 'El campo name no debe exceder los 245 caracteres'),
  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(255, 'El campo direccion no debe exceder los 255 caracteres'),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(255, 'El campo coordenadas no debe exceder los 255 caracteres'),
  es_soterrado: yup
    .boolean()
    .typeError('El estado es soterrado es Requerido')
    .required('El estado es soterrado es Requerido'),
  minimum_power: yup.string().required('El campo minimum_power es requerido'),
  maximum_power: yup.string().required('El campo maximum_power es requerido'),
  proyecto_cod: yup
    .string()
    .required('El campo proyecto_cod es requerido')
    .max(100, 'El campo proyecto_cod no debe exceder los 100 caracteres'),

  ///* fk
  ruta: yup
    .number()
    .typeError('El campo ruta es requerido')
    .required('El campo ruta es requerido'),
  olt: yup
    .number()
    .typeError('El campo olt es requerido')
    .required('El campo olt es requerido'),
  nodo: yup
    .number()
    .typeError('El campo nodo es requerido')
    .required('El campo nodo es requerido'),
  ciudad: yup
    .number()
    .typeError('El campo ciudad es requerido')
    .required('El campo ciudad es requerido'),
  sector: yup
    .number()
    .typeError('El campo sector es requerido')
    .required('El campo sector es requerido'),
});
