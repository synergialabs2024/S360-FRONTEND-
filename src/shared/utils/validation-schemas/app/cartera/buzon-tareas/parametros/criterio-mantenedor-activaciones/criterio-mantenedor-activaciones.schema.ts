import { tipoRubroAdicionalMantenedorEnumChoice } from '@/shared/constants';
import * as yup from 'yup';

export const CriterioMantenedorActivacionesFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  description: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe exceder los 200 caracteres'),

  code: yup
    .string()
    .typeError('El campo codigo es requerido')
    .required('El campo codigo es requerido'),

  tipo_mantenedor_activacion: yup
    .string()
    .typeError('El campo tipo mantenedor activacion es requerido')
    .required('El campo tipo mantenedor activacion es requerido'),

  dia_inicio_range: yup.number(),

  dia_fin_range: yup
    .number()
    .optional()
    .when('tipo_mantenedor_activacion', {
      is: tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_RECONEXIONES,
      then: schema =>
        schema
          .required('El campo dia fin range es requerido.')
          .test(
            'min-dynamic',
            'El valor de día fin debe ser mayor al día inicio',
            function (value) {
              const { dia_inicio_range } = this.parent; // Obtener dia_inicio_range del formulario
              return (
                typeof value === 'number' && value > (dia_inicio_range || 31)
              );
            },
          ),
    }),
});
