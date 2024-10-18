import { MetodoPagoEnumUUID } from '@/shared/constants';
import { MetodoPago } from '@/shared/interfaces';
import * as yup from 'yup';

export const preventaFormSchema = yup.object({
  nombre_persona_referencia: yup
    .string()
    .required('El campo nombre persona referencia es requerido')
    .max(
      200,
      'El campo nombre persona referencia no debe exceder los 200 caracteres',
    ),
  parentesco_referencia: yup
    .string()
    .required('El campo parentesco referencia es requerido')
    .max(
      200,
      'El campo parentesco referencia no debe exceder los 200 caracteres',
    ),
  celular_adicional: yup
    .string()
    .required('El campo celular adicional es requerido')
    .max(200, 'El campo celular adicional no debe exceder los 200 caracteres'),

  direccion: yup
    .string()
    .required('El campo direccion es requerido')
    .max(38, 'El campo direccion no debe exceder los 38 caracteres'),

  // EQUIFAX -----------
  rango_capacidad_pago: yup
    .string()
    .required('El campo rango capacidad pago es requerido')
    .max(
      200,
      'El campo rango capacidad pago no debe exceder los 200 caracteres',
    ),
  score_servicios: yup
    .string()
    .required('El campo score servicios es requerido')
    .max(200, 'El campo score servicios no debe exceder los 200 caracteres'),
  score_sobreendeudamiento: yup
    .string()
    .required('El campo score sobreendeudamiento es requerido')
    .max(
      200,
      'El campo score sobreendeudamiento no debe exceder los 200 caracteres',
    ),
  plan_sugerido_buro: yup
    .string()
    .required('El campo plan sugerido buro es requerido')
    .max(200, 'El campo plan sugerido buro no debe exceder los 200 caracteres'),
  planes_sugeridos_buro: yup
    .array()
    .of(
      yup
        .string()
        .max(
          200,
          'El campo planes sugeridos buro no debe exceder los 200 caracteres',
        ),
    ),

  ///* fk ---------------------------
  tipo_servicio: yup
    .string()
    .required('El campo tipo servicio es requerido')
    .max(200, 'El campo tipo servicio no debe exceder los 200 caracteres'),
  tipo_plan: yup
    .string()
    .required('El campo tipo plan es requerido')
    .max(200, 'El campo tipo plan no debe exceder los 200 caracteres'),
  plan_internet: yup
    .number()
    .typeError('El campo plan internet es requerido')
    .required('El campo plan internet es requerido'),

  metodo_pago: yup
    .number()
    .required('El campo metodo pago es requerido')
    .typeError('El campo metodo pago es requerido'),

  rawPaymentMethod: yup.object().nullable().optional(),

  // DEBITO ----
  entidad_financiera: yup
    .number()
    .optional()
    .nullable()
    .when('rawPaymentMethod', {
      is: (rawPaymentMethod: MetodoPago) =>
        rawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO,
      then: schema =>
        schema
          .required('El campo entidad financiera es requerido')
          .typeError('El campo entidad financiera es requerido'),
    }),
  tipo_cuenta_bancaria: yup
    .string()
    .optional()
    .nullable()
    .when('rawPaymentMethod', {
      is: (rawPaymentMethod: MetodoPago) =>
        rawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO,
      then: schema =>
        schema
          .required('El campo tipo cuenta bancaria es requerido')
          .typeError('El campo tipo cuenta bancaria es requerido'),
    }),
  numero_cuenta_bancaria: yup
    .string()
    .optional()
    .nullable()
    .when('rawPaymentMethod', {
      is: (rawPaymentMethod: MetodoPago) =>
        rawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO,
      then: schema =>
        schema
          .required('El campo numero cuenta bancaria es requerido')
          .typeError('El campo numero cuenta bancaria es requerido'),
    }),

  // CREDITO ----
  numero_tarjeta_credito: yup
    .string()
    .optional()
    .nullable()
    .when('rawPaymentMethod', {
      is: (rawPaymentMethod: MetodoPago) =>
        rawPaymentMethod?.uuid === MetodoPagoEnumUUID.CREDITO,
      then: schema =>
        schema
          .required('El campo numero tarjeta credito es requerido')
          .typeError('El campo numero tarjeta credito es requerido'),
    }),
});

export const unlockPlanillaPhotoSchema = yup.object({
  motivo: yup
    .string()
    .required('El campo motivo es requerido')
    .max(900, 'El campo motivo no debe exceder los 900 caracteres'),
});
