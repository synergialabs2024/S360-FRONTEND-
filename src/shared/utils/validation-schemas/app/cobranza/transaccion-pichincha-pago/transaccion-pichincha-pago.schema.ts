import * as yup from 'yup';

export const transaccionpichinchapagoFormSchema = yup.object({
  id_sobre: yup
    .string()
    .required('El campo id sobre es requerido')
    .max(20, 'El campo id sobre no debe exceder los 20 caracteres'),
  id_item: yup
    .string()
    .required('El campo id item es requerido')
    .max(20, 'El campo id item no debe exceder los 20 caracteres'),
  referencia_sobre: yup
    .string()
    .required('El campo referencia sobre es requerido')
    .max(100, 'El campo referencia sobre no debe exceder los 100 caracteres'),
  pais: yup
    .string()
    .required('El campo pais es requerido')
    .max(5, 'El campo pais no debe exceder los 5 caracteres'),
  banco: yup
    .string()
    .required('El campo banco es requerido')
    .max(10, 'El campo banco no debe exceder los 10 caracteres'),
  formapago: yup
    .string()
    .required('El campo forma pago es requerido')
    .max(10, 'El campo forma pago no debe exceder los 10 caracteres'),
  pais_banco_cuenta: yup
    .string()
    .required('El campo pais banco cuenta sobre es requerido')
    .max(
      5,
      'El campo pais banco cuenta sobre no debe exceder los 5 caracteres',
    ),
  contrapartida: yup
    .string()
    .required('El campo contrapartida es requerido')
    .max(20, 'El campo contrapartida no debe exceder los 20 caracteres'),
  referencia: yup
    .string()
    .required('El campo referencia es requerido')
    .max(255, 'El campo referencia no debe exceder los 255 caracteres'),
  valor_procc: yup.string().required('El campo valor_procc es requerido'),
  valor: yup.string().required('El campo valor es requerido'),
  moneda: yup
    .string()
    .required('El campo moneda es requerido')
    .max(5, 'El campo moneda no debe exceder los 5 caracteres'),
  fecha_proceso: yup
    .string()
    .required('El campo fecha proceso es requerido')
    .max(20, 'El campo fecha proceso no debe exceder los 20 caracteres'),
  hora_proceso: yup
    .string()
    .required('El campo hora proceso es requerido')
    .max(20, 'El campo hora proceso no debe exceder los 20 caracteres'),
  mensaje: yup
    .string()
    .required('El campo mensaje sobre es requerido')
    .max(255, 'El campo mensaje sobre no debe exceder los 255 caracteres'),
  referencia_adicional: yup
    .string()
    .required('El campo referencia adicional es requerido')
    .max(
      255,
      'El campo referencia adicional no debe exceder los 255 caracteres',
    ),
  tipo_pago: yup
    .string()
    .required('El campo tipo pago es requerido')
    .max(10, 'El campo tipo pago no debe exceder los 10 caracteres'),
  numero_cuenta: yup
    .string()
    .required('El campo numero cuenta es requerido')
    .max(20, 'El campo numero cuenta no debe exceder los 20 caracteres'),
  no_documento: yup
    .string()
    .required('El campo no documento es requerido')
    .max(20, 'El campo no documento no debe exceder los 20 caracteres'),
  estado_impresion: yup
    .string()
    .required('El campo estado impresion sobre es requerido')
    .max(
      20,
      'El campo estado impresion sobre no debe exceder los 20 caracteres',
    ),
  secuencial_cobro: yup
    .string()
    .required('El campo secuencial_cobro es requerido')
    .max(20, 'El campo secuencial_cobro no debe exceder los 20 caracteres'),
  numero_comprobante: yup
    .string()
    .required('El campo numero comprobante es requerido')
    .max(20, 'El campo numero comprobante no debe exceder los 20 caracteres'),
  bitmap39: yup
    .string()
    .required('El campo bitmap39 es requerido')
    .max(10, 'El campo bitmap39 no debe exceder los 10 caracteres'),
  bitmap40: yup
    .string()
    .required('El campo bitmap40 es requerido')
    .max(255, 'El campo bitmap40 no debe exceder los 255 caracteres'),
  estado: yup
    .string()
    .required('El campo estado sobre es requerido')
    .max(20, 'El campo estado sobre no debe exceder los 20 caracteres'),
  numero_documento: yup
    .string()
    .required('El campo numero documento sobre es requerido')
    .max(
      20,
      'El campo numero documento sobre no debe exceder los 20 caracteres',
    ),
});
