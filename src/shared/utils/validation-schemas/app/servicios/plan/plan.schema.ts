import * as yup from 'yup';
import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';

export const planFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  description: descriptionYupValidation,
  valor: yup
    .string()
    .required('El campo valor es requerido')
    .max(200, 'El campo valor no debe exceder los 200 caracteres'),
  velocidad_descarga_minima: yup
    .string()
    .required('El campo velocidad descarga minima es requerido')
    .max(
      200,
      'El campo velocidad descarga minima no debe exceder los 200 caracteres',
    ),
  velocidad_descarga_maxima: yup
    .string()
    .required('El campo velocidad descarga maxima es requerido')
    .max(
      200,
      'El campo velocidad descarga maxima no debe exceder los 200 caracteres',
    ),
  velocidad_subida_minima: yup
    .string()
    .required('El campo velocidad subida minima es requerido')
    .max(
      200,
      'El campo velocidad subida minima no debe exceder los 200 caracteres',
    ),
  velocidad_subida_maxima: yup
    .string()
    .required('El campo velocidad subida maxima es requerido')
    .max(
      200,
      'El campo velocidad subida maxima no debe exceder los 200 caracteres',
    ),
  comparticion: yup
    .string()
    .required('El campo comparticion es requerido')
    .max(200, 'El campo comparticion no debe exceder los 200 caracteres'),
  prioridad: yup
    .number()
    .typeError('El campo prioridad es requerido')
    .required('El campo prioridad es requerido'),
  state: fieldStateYupValidation,

  unidad_velocidad: yup
    .string()
    .required('El campo unidad velocidad es requerido')
    .max(200, 'El campo unidad velocidad no debe exceder los 200 caracteres'),
  permanencia: yup
    .string()
    .required('El campo permanencia es requerido')
    .max(200, 'El campo permanencia no debe exceder los 200 caracteres'),
  tipo_servicio: yup
    .string()
    .required('El campo tipo servicio es requerido')
    .max(200, 'El campo tipo servicio no debe exceder los 200 caracteres'),
  tipo_plan: yup
    .string()
    .required('El campo tipo plan es requerido')
    .max(200, 'El campo tipo plan no debe exceder los 200 caracteres'),
});
