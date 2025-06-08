import * as yup from 'yup';

import { fieldStateYupValidation } from '../../common';

export const configuracionPlantillaFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  state: fieldStateYupValidation,
  dia_pago: yup
    .number()
    .typeError('El campo dia pago es requerido')
    .required('El campo dia pago es requerido'),
  dia_facturacion: yup
    .number()
    .typeError('El campo dia facturacion es requerido')
    .required('El campo dia facturacion es requerido'),
  dia_suspension: yup
    .number()
    .typeError('El campo dia suspension es requerido')
    .required('El campo dia suspension es requerido'),
  dia_pago_limite: yup
    .number()
    .typeError('El campo dia pago limite es requerido')
    .required('El campo dia pago limite es requerido'),
  crea_factura: yup.string().optional().nullable(),
  dias_gracia: yup
    .string()
    .required('El campo dias gracia es requerido')
    .max(200, 'El campo dias gracia no debe exceder los 200 caracteres'),
  aplica_corte: yup
    .string()
    .required('El campo aplica corte es requerido')
    .max(200, 'El campo aplica corte no debe exceder los 200 caracteres'),
  aplica_mora: yup
    .boolean()
    .typeError('El campo aplica mora es requerido')
    .required('El campo aplica mora es requerido'),
  bajar_velocidad: yup
    .boolean()
    .typeError('El campo bajar velocidad es requerido')
    .required('El campo bajar velocidad es requerido'),

  aplica_reconexion: yup
    .boolean()
    .typeError('El campo aplica reconexion es requerido')
    .required('El campo aplica reconexion es requerido'),
  valor_reconexion: yup
    .string()
    .when('aplica_reconexion', {
      is: true,
      then: schema =>
        schema.required(
          'El campo valor reconexion es requerido cuando aplica reconexion',
        ),
    })
    .test(
      'is-numeric-positive',
      'El campo valor reconexion debe ser numérico',
      value => {
        if (!value) return true;
        return !isNaN(Number(value));
      },
    ),

  aviso_pantalla: yup
    .string()
    .required('El campo aviso pantalla es requerido')
    .max(200, 'El campo aviso pantalla no debe exceder los 200 caracteres'),
  recordatorio_pago: yup
    .string()
    .required('El campo recordatorio pago es requerido')
    .max(200, 'El campo recordatorio pago no debe exceder los 200 caracteres'),
  recordatorio_1: yup
    .string()
    .required('El campo recordatorio 1 es requerido')
    .max(200, 'El campo recordatorio 1 no debe exceder los 200 caracteres'),
  recordatorio_2: yup
    .string()
    .required('El campo recordatorio 2 es requerido')
    .max(200, 'El campo recordatorio 2 no debe exceder los 200 caracteres'),
  recordatorio_3: yup
    .string()
    .required('El campo recordatorio 3 es requerido')
    .max(200, 'El campo recordatorio 3 no debe exceder los 200 caracteres'),
  impuesto_1: yup
    .number()
    .typeError('El campo impuesto 1 es requerido')
    .required('El campo impuesto 1 es requerido'),
  // impuesto_2: yup.number().optional().nullable(),
  // impuesto_3: yup.number().optional().nullable(),
});

export const configuracionPlantillaClienteFormSchema = yup.object({
  dias_gracia: yup
    .string()
    .required('El campo dias gracia es requerido')
    .max(200, 'El campo dias gracia no debe exceder los 200 caracteres'),
  dia_pago: yup
    .number()
    .typeError('El campo dia pago es requerido')
    .required('El campo dia pago es requerido'),
  dia_pago_limite: yup
    .number()
    .typeError('El campo dia pago limite es requerido')
    .required('El campo dia pago limite es requerido'),
  dia_suspension: yup
    .number()
    .typeError('El campo dia suspension es requerido')
    .required('El campo dia suspension es requerido'),
  dia_facturacion: yup
    .number()
    .typeError('El campo dia facturacion es requerido')
    .required('El campo dia facturacion es requerido'),
});
