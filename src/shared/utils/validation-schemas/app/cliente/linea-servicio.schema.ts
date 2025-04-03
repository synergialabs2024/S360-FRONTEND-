import * as yup from 'yup';

export const lineaServicioFormSchema = yup.object({
  id: yup
    .number()
    .typeError('El campo id es requerido')
    .required('El campo id es requerido'),
  estado_linea: yup
    .string()
    .required('El campo estado linea es requerido')
    .max(200, 'El campo estado linea no debe exceder los 200 caracteres'),
  linea_numero: yup
    .number()
    .typeError('El campo linea numero es requerido')
    .required('El campo linea numero es requerido'),
  cliente: yup
    .number()
    .typeError('El campo cliente es requerido')
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
  canal_venta: yup
    .number()
    .typeError('El campo canal venta es requerido')
    .optional()
    .nullable(),
  vendedor: yup
    .number()
    .typeError('El campo vendedor es requerido')
    .optional()
    .nullable(),
});

// // // manual suspension ----------
export const manualSuspensionSchema = yup.object({
  reason_suspension: yup
    .number()
    .typeError('El campo motivo de suspensión es requerido')
    .required('El campo motivo de suspensión es requerido'),
});
