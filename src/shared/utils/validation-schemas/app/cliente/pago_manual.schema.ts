import * as yup from 'yup';

export const pagoManualFormSchema = yup.object({
  entidad_financiera: yup
    .string()
    .required('El campo entidad financiera es requerido'),
  code: yup.string().required('El campo ifi es requerido'),
  numero_autorizacion: yup.string().when('entidad_financiera', {
    is: (entidadFinanciera: number | undefined) =>
      entidadFinanciera !== undefined,
    then: schema =>
      schema
        .required('Campo obligatorio')
        .length(11, 'Debe tener 11 caracteres')
        .matches(/^S\d{10}$/, 'Formato inválido: S + 10 dígitos'),
    otherwise: schema => schema.notRequired(),
  }),
});
