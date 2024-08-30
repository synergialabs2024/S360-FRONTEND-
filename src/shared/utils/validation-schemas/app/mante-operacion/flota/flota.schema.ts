import * as yup from 'yup';

const currentYear = new Date().getFullYear();

export const flotaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  marca_vehiculo: yup
    .string()
    .required('El campo marca vehiculo es requerido')
    .max(200, 'El campo marca vehiculo no debe exceder los 200 caracteres'),
  modelo_vehiculo: yup
    .string()
    .required('El campo modelo vehiculo es requerido')
    .max(200, 'El campo modelo vehiculo no debe exceder los 200 caracteres'),
  anio_vehiculo: yup
    .number()
    .typeError('El campo año vehiculo es requerido')
    .required('El campo año vehiculo es requerido')
    .max(
      currentYear,
      `El año del vehículo no puede ser mayor que ${currentYear}`,
    ),
  placa_vehiculo: yup
    .string()
    .required('El campo placa vehiculo es requerido')
    .max(200, 'El campo placa vehiculo no debe exceder los 200 caracteres'),
  color_vehiculo: yup
    .string()
    .required('El campo color vehiculo es requerido')
    .max(200, 'El campo color vehiculo no debe exceder los 200 caracteres'),
  email: yup
    .string()
    .required('El campo email es requerido')
    .max(200, 'El campo email no debe exceder los 200 caracteres'),
  telefono_1: yup
    .string()
    .required('El campo telefono 1 es requerido')
    .max(100, 'El campo telefono 1 no debe exceder los 100 caracteres')
    .test(
      'unique-telefono-1',
      'El número de celular no se puede repetir',
      function (value) {
        const { telefono_2, telefono_3 } = this.parent;
        const othertelefonos = [telefono_2, telefono_3].filter(Boolean);
        return !othertelefonos.includes(value);
      },
    ),
  telefono_2: yup
    .string()
    .required('El campo telefono 2 es requerido')
    .optional()
    .max(100, 'El campo telefono 2 no debe exceder los 100 caracteres')
    .test(
      'unique-telefono-2',
      'El número de celular no se puede repetir',
      function (value) {
        const { telefono_1, telefono_3 } = this.parent;
        const othertelefonos = [telefono_1, telefono_3].filter(Boolean);
        return !othertelefonos.includes(value);
      },
    ),
  telefono_3: yup
    .string()
    .required('El campo telefono 3 es requerido')
    .max(100, 'El campo telefono 3 no debe exceder los 100 caracteres')
    .optional()
    .test(
      'unique-telefono-3',
      'El número de celular no se puede repetir',
      function (value) {
        const { telefono_1, telefono_2 } = this.parent;
        const othertelefonos = [telefono_1, telefono_2].filter(Boolean);
        return !othertelefonos.includes(value);
      },
    ),
  zonas: yup
    .number()
    .typeError('El campo zonas es requerido')
    .optional()
    .nullable(),
  user: yup
    .number()
    .typeError('El campo user es requerido')
    .optional()
    .nullable(),
  area: yup
    .number()
    .typeError('El campo area es requerido')
    .optional()
    .nullable(),
  departamento: yup
    .number()
    .typeError('El campo departamento es requerido')
    .optional()
    .nullable(),
  lider: yup
    .number()
    .typeError('El campo lider es requerido')
    .optional()
    .nullable(),
  auxiliar: yup
    .number()
    .typeError('El campo auxiliar es requerido')
    .nullable()
    .required('El campo auxiliar es requerido')
    .test(
      'not-same-as-lider',
      'Auxiliar no puede ser la misma persona que el Líder',
      function (value) {
        const { lider } = this.parent;
        return value === null || lider === null || value !== lider;
      },
    ),
  pais: yup
    .number()
    .typeError('El campo pais es requerido')
    .optional()
    .nullable(),
  provincia: yup
    .number()
    .typeError('El campo provincia es requerido')
    .optional()
    .nullable(),
  ciudad: yup
    .number()
    .typeError('El campo ciudad es requerido')
    .optional()
    .nullable(),
});
