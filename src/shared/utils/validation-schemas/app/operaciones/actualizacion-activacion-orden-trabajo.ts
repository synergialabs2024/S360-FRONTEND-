import * as yup from 'yup';

export const actualizacionActivacionOrdenTrabajoFormSchema = yup.object({
  new_serie_ont: yup
    .string()
    .required('El campo nueva serie es requerido')
    .max(200, 'El campo nueva serie no debe exceder los 200 caracteres'),
});
