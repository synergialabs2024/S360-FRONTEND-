import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const calendarioFacturacionFormSchema = yup.object({
  state: fieldStateYupValidation,
  aplica_nuevo: yup
    .boolean()
    .typeError('El campo aplica nuevo es requerido')
    .required('El campo aplica nuevo es requerido'),

  dia_inicio: yup
    .number()
    .typeError('El campo día inicio es requerido')
    .required('El campo día inicio es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767'),
  dia_fin: yup
    .number()
    .typeError('El campo día fin es requerido')
    .required('El campo día fin es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767')
    .test(
      'es-mayor',
      'El día fin debe ser mayor que el día inicio',
      function (dia_fin) {
        const { dia_inicio } = this.parent;
        return dia_fin > dia_inicio;
      },
    ),
  dia_pago: yup
    .number()
    .typeError('El campo día pago es requerido')
    .required('El campo día pago es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767'),
  dias_gracia: yup
    .number()
    .typeError('El campo día gracia es requerido')
    .required('El campo día gracia es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767'),
  dia_maximo_pago: yup
    .number()
    .typeError('El campo día máximo pago es requerido')
    .required('El campo día máximo pago es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767'),
  dia_suspension: yup
    .number()
    .typeError('El campo día suspensión es requerido')
    .required('El campo día suspensión es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767')
    .test(
      'es-mayor',
      'El día de suspensión debe ser mayor que el día máximo de pago',
      function (dia_suspension) {
        const { dia_maximo_pago } = this.parent;
        return dia_suspension > dia_maximo_pago;
      },
    ),
  dia_facturacion: yup
    .number()
    .typeError('El campo día facturación es requerido')
    .required('El campo día facturación es requerido')
    .min(0, 'El valor mínimo es 0')
    .max(32767, 'El valor máximo es 32767'),
});
