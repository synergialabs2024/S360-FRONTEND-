import * as yup from 'yup';

import { DEUDA_CUOTA_EQUIPO_VENTA_ESTADO_ARRAY_CHOICES } from '@/shared/constants';

export const deudacuotaequipoventaFormSchema = yup.object({
  estado_cuota: yup
    .mixed()
    .oneOf(
      DEUDA_CUOTA_EQUIPO_VENTA_ESTADO_ARRAY_CHOICES,
      'El estado cuota debe ser elegido',
    )
    .required('El campo estado cuota es requerido'),
  cuota_actual: yup
    .number()
    .typeError('El campo cuota actual es requerido')
    .required('El campo cuota actual es requerido'),
  monto_cuota: yup.string().required('El campo monto cuota es requerido'),
  subtotal_cuota: yup.string().required('El campo subtotal cuota es requerido'),
  taxes_cuota: yup.string().required('El campo taxes cuota es requerido'),
  fecha_vencimiento: yup
    .string()
    .required('El campo fecha vencimiento es requerido'),
  /*
  plan_pago_cuota: yup
    .number()
    .typeError('El campo plan pago cuota es requerido')
    .required('El campo plan pago cuota es requerido'),
  rubro: yup
    .number()
    .typeError('El campo rubro es requerido')
    .required('El campo rubro es requerido'),
    */
});
