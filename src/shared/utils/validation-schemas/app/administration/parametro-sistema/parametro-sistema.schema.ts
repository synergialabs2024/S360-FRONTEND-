import * as yup from 'yup';
import {
  descriptionYupValidation,
  fieldStateYupValidation,
} from '../../common';
import {
  regexHORA,
  regexFECHA,
  regexBOOLEANO,
  isValidJSON,
  isValidArray,
  regexMODELO,
  regexSLUG,
} from './parametro-sistema.regex';

export const parametro_sistemaFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('El campo name es requerido.')
    .max(200, 'El campo name no debe exceder los 200 caracteres.'),
  description: descriptionYupValidation,
  slug: yup
    .string()
    .required('El campo slug es requerido')
    .matches(
      regexSLUG,
      'El campo slug no debe tener espacios ni saltos de línea.',
    )
    .max(200, 'El campo slug no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  type: yup
    .string()
    .required('El campo type es requerido.')
    .max(200, 'El campo type no debe exceder los 200 caracteres.'),
  value: yup
    .string()
    .typeError('El campo value es requerido.')
    .when('type', {
      is: 'TEXTO',
      then: schema => schema.required('El campo TEXTO es requerido.'),
    })
    .when('type', {
      is: 'NUMERICO',
      then: schema => schema.required('El campo NUMERICO es requerido.'),
    })
    .when('type', {
      is: 'FECHA',
      then: schema =>
        schema
          .required('El campo FECHA es requerido.')
          .matches(
            regexFECHA,
            'Debe ser una fecha válida en formato YYYY-MM-DD.',
          ),
    })
    .when('type', {
      is: 'HORA',
      then: schema =>
        schema
          .required('El campo HORA es requerido.')
          .matches(regexHORA, 'Debe ser una hora válida en formato HH:mm:ss.'),
    })
    .when('type', {
      is: 'BOOLEANO',
      then: schema =>
        schema
          .required('El campo BOOLEANO es requerido.')
          .matches(
            regexBOOLEANO,
            'El campo value debe ser "Verdadero" o "Falso".',
          ),
    })
    .when('type', {
      is: 'JSON',
      then: schema =>
        schema.required('El campo JSON es requerido.').test({
          name: 'is-valid-json',
          message: 'El campo value debe ser un JSON válido.',
          test: isValidJSON,
        }),
    })
    .when('type', {
      is: 'ARRAY',
      then: schema =>
        schema.required('El campo ARRAY es requerido.').test({
          name: 'is-valid-json-array',
          test: isValidArray,
          message: 'El campo value debe ser un Array válido.',
        }),
    })
    .when('type', {
      is: 'MODELO',
      then: schema =>
        schema
          .required('El campo TEXTO es requerido.')
          .matches(
            regexMODELO,
            'El campo value debe empezar con el nombre de un modelo mas un uuid valido modelo:uuid.',
          ),
    }),
});
