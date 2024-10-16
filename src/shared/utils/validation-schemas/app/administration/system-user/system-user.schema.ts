import { UserRolesEnumChoice } from '@/shared/constants';
import * as yup from 'yup';
import { emailYupValidation } from '../../common';

export const systemUserFormSchema = yup.object({
  username: yup
    .string()
    .required('El campo username es requerido')
    .max(200, 'El campo username no debe exceder los 200 caracteres'),
  email: emailYupValidation,
  razon_social: yup
    .string()
    .required('El campo razon_social es requerido')
    .max(200, 'El campo razon_social no debe exceder los 200 caracteres'),
  tipo_identificacion: yup
    .string()
    .required('El campo tipo_identificacion es requerido')
    .max(
      200,
      'El campo tipo_identificacion no debe exceder los 200 caracteres',
    ),
  identificacion: yup
    .string()
    .required('El campo identificacion es requerido')
    .max(200, 'El campo identificacion no debe exceder los 200 caracteres'),
  groups: yup.string().optional().nullable(),

  //rol
  role: yup
    .string()
    .required('El campo role es requerido')
    .max(200, 'El campo role no debe exceder los 200 caracteres'),
  centro_costo: yup.number().optional().nullable(),
  area: yup
    .number()
    .optional()
    .nullable()
    .when('role', {
      is:
        UserRolesEnumChoice.ADMINISTRADOR ||
        UserRolesEnumChoice.COORDINADOR ||
        UserRolesEnumChoice.SUPERVISOR ||
        UserRolesEnumChoice.AGENTE,
      then: schema => schema.required('El campo area es requerido.'),
    }),
  departamento: yup
    .number()
    .optional()
    .nullable()
    .when('role', {
      is:
        UserRolesEnumChoice.COORDINADOR ||
        UserRolesEnumChoice.SUPERVISOR ||
        UserRolesEnumChoice.AGENTE,
      then: schema => schema.required('El campo departamento es requerido.'),
    }),
  canal_venta: yup
    .number()
    .optional()
    .nullable()
    .when('role', {
      is: UserRolesEnumChoice.SUPERVISOR || UserRolesEnumChoice.AGENTE,
      then: schema => schema.required('El campo canal_venta es requerido.'),
    }),

  // create_employee
  create_employee: yup.boolean().optional().nullable(),
  cargo: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo cargo es requerido')
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo cargo es requerido'),
    }),
  tipo_empleado: yup // choice
    .string()
    .optional()
    .nullable()
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo cargo es requerido'),
    }),
  salary: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo salario es requerido')
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo salario es requerido'),
    }),
  phone_1: yup
    .string()
    .optional()
    .nullable()
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo teléfono 1 es requerido'),
    })
    .test(
      'unique-phone-1',
      'El número de celular no se puede repetir con teléfono 2 o teléfono 3',
      function (value) {
        const { phone_2, phone_3 } = this.parent;
        const otherPhones = [phone_2, phone_3].filter(Boolean);
        return !otherPhones.includes(value);
      },
    ),

  phone_2: yup
    .string()
    .optional()
    .nullable()
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo teléfono 2 es requerido'),
    })
    .test(
      'unique-phone-2',
      'El número de celular no se puede repetir con teléfono 1 o teléfono 3',
      function (value) {
        const { phone_1, phone_3 } = this.parent;
        const otherPhones = [phone_1, phone_3].filter(Boolean);
        return !otherPhones.includes(value);
      },
    ),

  phone_3: yup
    .string()
    .optional()
    .nullable()
    .test(
      'unique-phone-3',
      'El número de celular no se puede repetir con teléfono 1 o teléfono 2',
      function (value) {
        const { phone_1, phone_2 } = this.parent;
        const otherPhones = [phone_1, phone_2].filter(Boolean);
        return !otherPhones.includes(value);
      },
    ),
  address: yup
    .string()
    .optional()
    .nullable()
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo dirección es requerido'),
    }),
  pais: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo país es requerido')
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo país es requerido'),
    }),
  provincia: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo provincia es requerido')
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo provincia es requerido'),
    }),
  ciudad: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo ciudad es requerido')
    .when('create_employee', {
      is: true,
      then: schema => schema.required('El campo ciudad es requerido'),
    }),
  zona: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo zona es requerido'),
  sector: yup
    .number()
    .optional()
    .nullable()
    .typeError('El campo sector es requerido'),
});
