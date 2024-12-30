import { IdentificationTypeEnumChoice } from '@/shared/constants';
import { validarCedulaEcuador } from '@/shared/utils/validators';
import * as yup from 'yup';

export const ticketTecnicoFormSchema = yup.object({
  tipo_identificacion: yup
    .string()
    .required('El campo tipo identificacion es requerido')
    .max(
      200,
      'El campo tipo identificacion no debe exceder los 200 caracteres',
    ),
  identificacion: yup
    .string()
    .required('El campo identificacion es requerido')
    .max(200, 'El campo identificacion no debe exceder los 200 caracteres')
    .when('tipo_identificacion', {
      is: IdentificationTypeEnumChoice.CEDULA,
      then: schema =>
        schema.test('validar-cedula', 'Cédula inválida', value =>
          validarCedulaEcuador(value),
        ),
    }),
  numero_contrato: yup
    .string()
    .required('El campo numero contrato es requerido')
    .max(
      200,
      'El campo tipo identificacion no debe exceder los 200 caracteres',
    ),
});
