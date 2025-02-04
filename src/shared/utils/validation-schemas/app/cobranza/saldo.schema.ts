import * as yup from 'yup';

export const saldoFormSchema = yup.object({
  monto: yup
    .string()
    .required('El campo monto es requerido')
    .max(200, 'El campo monto no debe exceder los 200 caracteres')
    .test('is-number', 'El campo monto debe ser un número', value => {
      return !isNaN(Number(value));
    }),
  descripcion: yup
    .string()
    .optional()
    .nullable()
    .max(200, 'El campo descripcion no debe exceder los 200 caracteres'),
});
