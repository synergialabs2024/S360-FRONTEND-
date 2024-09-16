import * as yup from 'yup';

export const agendamientoFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  estado_agendamiento: yup
    .string()
    .required('El campo estado agendamiento es requerido')
    .max(
      200,
      'El campo estado agendamiento no debe exceder los 200 caracteres',
    ),
  fecha_instalacion: yup
    .string()
    .required('El campo fecha instalacion es requerido')
    .max(200, 'El campo fecha instalacion no debe exceder los 200 caracteres'),
  hora_instalacion: yup
    .string()
    .required('El campo hora instalacion es requerido')
    .max(200, 'El campo hora instalacion no debe exceder los 200 caracteres'),
  distancia_nap: yup
    .number()
    .typeError('El campo distancia nap es requerido')
    .required('El campo distancia nap es requerido')
    .max(200, 'El campo distancia nap no debe exceder los 200 caracteres'),
  observacion_rechazo: yup
    .string()
    .required('El campo observacion rechazo es requerido')
    .max(
      200,
      'El campo observacion rechazo no debe exceder los 200 caracteres',
    ),
  numero_comprobante: yup
    .string()
    .required('El campo numero comprobante es requerido')
    .max(200, 'El campo numero comprobante no debe exceder los 200 caracteres'),
  url_foto_comprobante: yup.string().optional().nullable(),
  descripcion_pago: yup
    .string()
    .required('El campo descripcion pago es requerido')
    .max(200, 'El campo descripcion pago no debe exceder los 200 caracteres'),
  estado_pago: yup
    .string()
    .required('El campo estado pago es requerido')
    .max(200, 'El campo estado pago no debe exceder los 200 caracteres'),
  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .optional()
    .nullable(),
  solicitud_servicio: yup
    .number()
    .typeError('El campo solicitud servicio es requerido')
    .optional()
    .nullable(),
  preventa: yup
    .number()
    .typeError('El campo preventa es requerido')
    .optional()
    .nullable(),
  flota: yup
    .number()
    .typeError('El campo flota es requerido')
    .optional()
    .nullable(),
  nap: yup
    .number()
    .typeError('El campo nap es requerido')
    .optional()
    .nullable(),
  user_gestiona: yup
    .number()
    .typeError('El campo user gestiona es requerido')
    .optional()
    .nullable(),
  area: yup
    .number()
    .typeError('El campo area es requerido')
    .optional()
    .nullable(),
  departamento: yup
    .number()
    .typeError('El campo departamento es requerido')
    .optional()
    .nullable(),
  canal_venta: yup
    .number()
    .typeError('El campo canal venta es requerido')
    .optional()
    .nullable(),
  vendedor: yup
    .number()
    .typeError('El campo vendedor es requerido')
    .optional()
    .nullable(),
});
