import { IdentificationTypeEnumChoice } from '@/shared/constants';
import { validarCedulaEcuador } from '@/shared/utils/validators';
import * as yup from 'yup';

export const cambioDomicilioFormSchema = yup.object({
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

  coordenadas: yup.string().required('Las coordenadas son requeridas'),

  direccion_referencia: yup
    .string()
    .required('La dirección de referencia es requerida')
    .max(500, 'La dirección no debe exceder los 500 caracteres'),

  // Objeto anidado para ticket_visita_body
  ticket_visita_body: yup.object({
    origen_ticket: yup
      .number() // Asumiendo que origen_ticket es un ID numérico
      .required('El campo origen es requerido')
      .typeError('El origen debe ser un valor válido'),

    asunto_ticket: yup
      .number() // Asumiendo que asunto_ticket es un ID numérico
      .required('El campo asunto es requerido')
      .typeError('El asunto debe ser un valor válido'),

    // Agrega aquí otros campos del ticket_visita_body que necesites validar
    detalle_adicional_ticket: yup
      .string()
      .required('El detalle adicional es requerido')
      .max(500, 'El detalle no debe exceder los 500 caracteres'),

    fecha_sugerida_visita: yup
      .string()
      .required('El campo fecha sugerida visita es requerido'),

    franja_horaria: yup
      .string()
      .required('El campo franja_horaria es requerido'),
  }),
});
