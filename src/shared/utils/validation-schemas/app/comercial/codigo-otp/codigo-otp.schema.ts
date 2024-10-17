import * as yup from 'yup';

export const codigoOtpFormSchema = yup.object({
  celular: yup
    .string()
    .required('El campo celular es requerido')
    .max(200, 'El campo celular no debe exceder los 200 caracteres'),
  codigo_otp: yup
    .string()
    .required('El campo codigo otp es requerido')
    .max(200, 'El campo codigo otp no debe exceder los 200 caracteres'),
  estado_otp: yup
    .string()
    .required('El campo estado otp es requerido')
    .max(200, 'El campo estado otp no debe exceder los 200 caracteres'),
});
