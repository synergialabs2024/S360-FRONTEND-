import * as yup from 'yup';

export const ticketTecnicoFormSchema = yup.object({
  solucion_tecnico: yup
    .string()
    .required('El campo tipo identificacion es requerido')
    .max(
      200,
      'El campo tipo identificacion no debe exceder los 200 caracteres',
    ),
});
