import * as yup from 'yup';
import {
  IDENTIFICATION_TYPE_ARRAY_CHOICES,
  LEED_TELEVENTA_ESTADO_ARRAY_CHOICES,
  LEED_TELEVENTA_ORIGEN_ARRAY_CHOICES,
} from '@/shared/constants';

export const leedteleventaFormSchema = yup.object({
  origen_leed: yup
    .string()
    .required('El campo origen leed es requerido')
    .oneOf(
      LEED_TELEVENTA_ORIGEN_ARRAY_CHOICES,
      'El campo origen leed no es válido',
    ),
  estado_leed: yup
    .string()
    .required('El campo estado leed es requerido')
    .oneOf(
      LEED_TELEVENTA_ESTADO_ARRAY_CHOICES,
      'El campo estado leed no es válido',
    ),
  tipo_identificacion: yup
    .string()
    .required('El campo tipo identificacion es requerido')
    .oneOf(
      IDENTIFICATION_TYPE_ARRAY_CHOICES,
      'El campo tipo identificacion no es válido',
    ),
  identificacion: yup
    .string()
    .required('El campo identificacion es requerido')
    .max(100, 'El campo identificacion no debe exceder los 100 caracteres'),
  razon_social: yup
    .string()
    .required('El campo razon social es requerido')
    .max(255, 'El campo razon social no debe exceder los 255 caracteres'),
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(20, 'El campo celular no debe exceder los 20 caracteres'),
  celular_adicional: yup
    .string()
    .required('El campo celular adicional es requerido')
    .max(20, 'El campo celular adicional no debe exceder los 20 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(200, 'El campo email no debe exceder los 200 caracteres'),
  direccion_referencia: yup
    .string()
    .required('El campo direccion referencia es requerido')
    .max(
      255,
      'El campo direccion referencia no debe exceder los 255 caracteres',
    ),
  coordenadas: yup
    .string()
    .required('El campo coordenadas es requerido')
    .max(200, 'El campo coordenadas no debe exceder los 200 caracteres'),
  motivo_rechazo_libre: yup
    .string()
    .required('El campo motivo rechazo libre es requerido')
    .max(
      600,
      'El campo motivo rechazo libre no debe exceder los 600 caracteres',
    ),

  plan_internet: yup
    .number()
    .typeError('El campo plan internet es requerido')
    .required('El campo plan internet es requerido'),
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
});
