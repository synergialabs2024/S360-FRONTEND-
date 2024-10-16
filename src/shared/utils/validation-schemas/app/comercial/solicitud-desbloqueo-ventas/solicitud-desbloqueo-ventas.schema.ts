import * as yup from 'yup';

export const solicitudDesbloqueoVentasFormSchema = yup.object({
  solicitud_desbloqueo_estado: yup
    .string()
    .required('El campo solicitud desbloqueo estado es requerido'),
  modelo: yup.string().required('El campo modelo es requerido'),
  modelo_id: yup
    .number()
    .typeError('El campo modelo id es requerido')
    .required('El campo modelo id es requerido'),

  modelo_estado: yup
    .string()
    .required('El campo modelo estado es requerido')
    .max(200, 'El campo modelo estado no debe exceder los 200 caracteres'),
});

export const approveOrRejectSolUnblockSalesFormSchema = yup.object({
  motivo: yup
    .string()
    .required('El campo motivo es requerido')
    .max(849, 'El campo motivo no debe exceder los 849 caracteres'),
});
