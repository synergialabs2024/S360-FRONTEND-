import { GeneralModelStatesEnumChoice } from '@/shared/constants';
import * as yup from 'yup';

export const solicitudRecoordinacionAgendaFormSchema = yup.object({
  id: yup.number().typeError('El campo id es requerido').optional().nullable(),
  estado_solicitud: yup
    .string()
    .required('El campo estado solicitud es requerido')
    .max(200, 'El campo estado solicitud no debe exceder los 200 caracteres'),
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(200, 'El campo descripcion no debe exceder los 200 caracteres'),
  agendamiento: yup
    .number()
    .typeError('El campo agendamiento es requerido')
    .required('El campo agendamiento es requerido'),
  usuario_atiende: yup
    .number()
    .typeError('El campo usuario atiende es requerido')
    .required('El campo usuario atiende es requerido'),
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

export const approveOrRejectSolRecoordinacionSchema = yup.object({
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .min(10, 'El campo descripcion debe tener al menos 10 caracteres')
    .max(750, 'El campo descripcion no debe exceder los 750 caracteres'),

  estado_solicitud: yup
    .string()
    .required('El campo estado solicitud es requerido')
    .oneOf(
      [
        GeneralModelStatesEnumChoice.APROBADO,
        GeneralModelStatesEnumChoice.RECHAZADO,
      ],
      'El campo estado solicitud debe ser APROBADO o RECHAZADO',
    ),
});
