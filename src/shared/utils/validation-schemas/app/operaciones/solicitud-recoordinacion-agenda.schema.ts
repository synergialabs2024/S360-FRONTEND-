import * as yup from 'yup';

import { GeneralModelStatesEnumChoice } from '@/shared/constants';

export const solicitudRecoordinacionAgendaFormSchema = yup.object({
  descripcion: yup
    .string()
    .required('El campo descripcion es requerido')
    .max(750, 'El campo descripcion no debe exceder los 750 caracteres'),
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

export const rejectSolRecoordinacionSchema = yup.object({
  observacion_atiende: yup
    .string()
    .optional()
    .nullable()
    .max(
      750,
      'El campo observacion atiende no debe exceder los 750 caracteres',
    ),
});
