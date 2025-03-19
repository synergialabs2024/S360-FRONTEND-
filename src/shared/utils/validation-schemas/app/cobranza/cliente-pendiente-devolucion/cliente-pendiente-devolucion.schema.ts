import { EstadoDevolucionEnumChoice } from '@/shared/constants';
import * as yup from 'yup';

export const clientePendienteDevolucionFormSchema = yup.object({
  numero_referencia: yup
    .string()
    .required('El campo numero referencia es requerido')
    .max(255, 'El campo numero referencia no debe exceder los 255 caracteres'),
  estado_devolucion: yup
    .string()
    .oneOf(
      Object.values(EstadoDevolucionEnumChoice),
      'El estado de devolución debe ser PENDIENTE, FINALIZADO o RECHAZADO',
    )
    .required('El campo estado de devolución es requerido'),
  total: yup.string().required('El campo total es requerido'),
  linea_servicio: yup
    .number()
    .typeError('El campo linea servicio es requerido')
    .required('El campo linea servicio es requerido'),
  factura: yup
    .number()
    .typeError('El campo factura es requerido')
    .required('El campo factura es requerido'),
  preventa: yup
    .number()
    .typeError('El campo preventa es requerido')
    .required('El campo preventa es requerido'),
  cliente: yup
    .number()
    .typeError('El campo cliente es requerido')
    .required('El campo cliente es requerido'),
  contrato: yup
    .number()
    .typeError('El campo contrato es requerido')
    .required('El campo contrato es requerido'),
  area: yup
    .number()
    .typeError('El campo area es requerido')
    .required('El campo area es requerido'),
  departamento: yup
    .number()
    .typeError('El campo departamento es requerido')
    .required('El campo departamento es requerido'),
  canal_venta: yup
    .number()
    .typeError('El campo canal venta es requerido')
    .required('El campo canal venta es requerido'),
  vendedor: yup
    .number()
    .typeError('El campo vendedor es requerido')
    .required('El campo vendedor es requerido'),
  rubros_asociados: yup
    .array()
    .of(yup.number().typeError('Cada rubro debe ser un número'))
    .min(1, 'Debe haber al menos un rubro asociado')
    .required('El campo rubros asociados es requerido'),
});
