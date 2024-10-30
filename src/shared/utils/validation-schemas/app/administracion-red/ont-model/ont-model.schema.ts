import * as yup from 'yup';
import { fieldStateYupValidation } from '../../common';

export const ontModelFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(100, 'El campo name no debe exceder los 100 caracteres'),
  state: fieldStateYupValidation,
  pon_type: yup.string().required('El campo pon_type es requerido'),
  mode: yup.string().required('El campo mode es requerido'),
  ethernet_ports: yup
    .number()
    .typeError('El campo ethernet_ports es requerido')
    .required('El campo ethernet_ports es requerido'),
  wifi_ssids: yup
    .number()
    .typeError('El campo wifi_ssids es requerido')
    .required('El campo wifi_ssids es requerido'),
  voip_ports: yup
    .number()
    .typeError('El campo voip_ports es requerido')
    .required('El campo voip_ports es requerido'),
});
