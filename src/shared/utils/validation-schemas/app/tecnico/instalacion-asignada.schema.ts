import * as yup from 'yup';

import {
  CodigoModeloProductoEnumChoice,
  TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES,
} from '@/shared/constants';

export const ordenTrabajoFormSchema = yup.object({
  hora_inicio: yup
    .string()
    .required('La hora de inicio de instalación es requerida'),
  hora_fin: yup.string().required('La hora de fin de instalación es requerida'),
  // .test(
  //   'is-greater',
  //   'La hora de fin debe ser posterior a la hora de inicio',
  //   function (value) {
  //     const horaInicio = dayjs(this.parent.hora_inicio, 'HH:mm');
  //     const horaFin = dayjs(value, 'HH:mm');

  //     return horaFin.isAfter(horaInicio);
  //   },
  // ),

  potencia_ont: yup
    .number()
    .required('El campo potencia ont es requerido')
    .typeError('El campo potencia ont debe ser un número')
    .positive('El campo potencia ont debe ser un número positivo')
    .min(1, 'El campo potencia ont debe ser mayor a 0'),

  nap: yup
    .number()
    .required('El campo nap es requerido')
    .typeError('El campo nap es requerido'),
  puerto_nap: yup
    .number()
    .required('El campo puerto nap es requerido')
    .typeError('El campo puerto nap es requerido'),
  distancia_nap: yup
    .number()
    .required('El campo distancia nap es requerido')
    .typeError('El campo distancia nap es requerido'),

  // INVENTARIO -------------------
  modelo_ont_wifi: yup
    .string()
    .required('El campo modelo ont wifi es requerido')
    .max(200, 'El campo modelo ont wifi no debe exceder los 200 caracteres'),
  modelo_fibra_utilizada: yup
    .string()
    .required('El campo modelo fibra utilizada es requerido')
    .max(
      200,
      'El campo modelo fibra utilizada no debe exceder los 200 caracteres',
    ),
  punta_inicial_fibra: yup
    .number()
    .optional()
    .nullable()
    .when('modelo_fibra_utilizada', {
      is: (value: any) => value === CodigoModeloProductoEnumChoice.FIBRA_GRANEL,
      then: schema =>
        schema
          .required('El campo punta inicial fibra es requerido')
          .typeError('El campo punta inicial fibra debe ser un número')
          .positive('El campo punta inicial fibra debe ser un número positivo')
          .min(1, 'El campo punta inicial fibra debe ser mayor a 0'),
    }),
  punta_final_fibra: yup
    .number()
    .optional()
    .nullable()
    .when('modelo_fibra_utilizada', {
      is: (value: any) => value === CodigoModeloProductoEnumChoice.FIBRA_GRANEL,
      then: schema =>
        schema
          .required('El campo punta final fibra es requerido')
          .typeError('El campo punta final fibra debe ser un número')
          .positive('El campo punta final fibra debe ser un número positivo')
          .min(1, 'El campo punta final fibra debe ser mayor a 0')
          .test(
            'punta_final_fibra',
            'La punta final fibra debe ser mayor a la punta inicial fibra',
            function (value) {
              return value > this.parent.punta_inicial_fibra;
            },
          ),
    }),
  metraje_utilizado_fibra: yup.string().when('modelo_fibra_utilizada', {
    is: (value: any) => value === CodigoModeloProductoEnumChoice.FIBRA_GRANEL,
    then: schema =>
      schema
        .required('El campo metraje utilizado fibra es requerido')
        .max(
          200,
          'El campo metraje utilizado fibra no debe exceder los 200 caracteres',
        )
        .matches(
          /^[0-9]+(\.[0-9]+)?$/,
          'El campo metraje utilizado fibra debe ser un número',
        )
        .test(
          'metraje_utilizado_fibra',
          'El campo metraje utilizado fibra debe ser mayor a 0',
          function (value) {
            return parseFloat(value) > 0;
          },
        ),
  }),

  // ACTIVACION -------------------
  estado_activacion: yup
    .string()
    .required('El campo estado activacion es requerido')
    .max(200, 'El campo estado activacion no debe exceder los 200 caracteres'),
  ipv4: yup
    .string()
    .required('El campo ipv4 es requerido')
    .max(200, 'El campo ipv4 no debe exceder los 200 caracteres'),
  ipv6: yup
    .string()
    .required('El campo ipv6 es requerido')
    .max(200, 'El campo ipv6 no debe exceder los 200 caracteres'),
  pppoe: yup
    .string()
    .required('El campo pppoe es requerido')
    .max(200, 'El campo pppoe no debe exceder los 200 caracteres'),
  pppassword: yup
    .string()
    .required('El campo pppassword es requerido')
    .max(200, 'El campo pppassword no debe exceder los 200 caracteres'),
});

// // --------------------
export const requestChangePortSchema = yup.object({
  tipo_actualizacion_puerto: yup
    .string()
    .required('El campo tipo actualizacion puerto es requerido')
    .oneOf(
      TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES,
      'El campo tipo actualizacion puerto no es válido',
    ),

  observacion_cambio_puerto: yup
    .string()
    .optional()
    .nullable()
    .max(
      200,
      'El campo observacion cambio puerto no debe exceder los 200 caracteres',
    ),
});

export const prerejectInstallOTAsigSchema = yup.object({
  motivo_prerechazo: yup
    .number()
    .required('El campo motivo prerechazo es requerido')
    .typeError('El campo motivo prerechazo es requerido'),
  observacion_prerechazo: yup
    .string()
    .optional()
    .nullable()
    .max(
      200,
      'El campo observacion prerechazo no debe exceder los 200 caracteres',
    ),
});

// // UPD data required by auditoria --------------------
export const updDataInstallOtByTechReqAuditSchema = yup.object({
  direccion_referencia: yup
    .string()
    .required('El campo dirección es requerido')
    .max(200, 'El campo dirección no debe exceder los 200 caracteres'),

  potencia_ont: yup
    .number()
    .required('El campo potencia ont es requerido')
    .typeError('El campo potencia ont debe ser un número')
    .positive('El campo potencia ont debe ser un número positivo')
    .min(1, 'El campo potencia ont debe ser mayor a 0'),

  observaciones_adicionales: yup
    .string()
    .optional()
    .nullable()
    .max(
      685,
      'El campo observaciones adicionales no debe exceder los 685 caracteres',
    ),

  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),
  sector: yup
    .number()
    .required('El campo sector es requerido')
    .typeError('El campo sector es requerido'),
  zona: yup
    .number()
    .required('El campo zona es requerido')
    .typeError('El campo zona es requerido'),

  nap: yup
    .number()
    .required('El campo nap es requerido')
    .typeError('El campo nap es requerido'),
  distancia_nap: yup
    .number()
    .required('El campo distancia nap es requerido')
    .typeError('El campo distancia nap es requerido'),
  puerto_nap: yup
    .number()
    .required('El campo puerto nap es requerido')
    .typeError('El campo puerto nap es requerido'),
});
