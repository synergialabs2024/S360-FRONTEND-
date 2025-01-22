import * as yup from 'yup';

export const saldoFormSchema = yup.object({
  monto: yup
    .string()
    .required('El campo monto es requerido')
    .max(200, 'El campo monto no debe exceder los 200 caracteres'),
  fecha_consumo: yup
    .string()
    .required('El campo fecha consumo es requerido')
    .max(200, 'El campo fecha consumo no debe exceder los 200 caracteres'),
});
