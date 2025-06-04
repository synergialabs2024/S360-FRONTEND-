import { YES_NO_ARRAY_CHOICES } from '@/shared/constants';
import * as yup from 'yup';

export const areaFormSchema = yup.object({
  company_name: yup
    .string()
    .required('El campo Razón social es requerido')
    .max(50, 'El campo Razón social no debe exceder los 50 caracteres'),
  commercial_name: yup
    .string()
    .required('El campo Nombre Comercial es requerido')
    .max(50, 'El campo Nombre Comercial no debe exceder los 50 caracteres'),
  main_address: yup
    .string()
    .required('El campo Dirección del Establecimiento Matriz es requerido')
    .max(
      200,
      'El campo Dirección del Establecimiento Matriz no debe exceder los 200 caracteres',
    ),
  establishment_address: yup
    .string()
    .required('El campo Dirección del Establecimiento Emisor es requerido')
    .max(
      200,
      'El campo Dirección del Establecimiento Emisor no debe exceder los 200 caracteres',
    ),
  establishment_code: yup
    .string()
    .required('El campo Código del Establecimiento Emisor es requerido')
    .max(
      3,
      'El campo Código del Establecimiento Emisor no debe exceder los 3 caracteres',
    ),
  issuing_point_code: yup
    .string()
    .required('El campo Código del Punto de Emisión es requerido')
    .max(
      13,
      'El campo Código del Punto de Emisión no debe exceder los 13 caracteres',
    ),
  special_taxpayer: yup
    .string()
    .required('El campo Contribuyente Especial es requerido')
    .max(
      200,
      'El campo Contribuyente Especial no debe exceder los 200 caracteres',
    ),
  obligated_accounting: yup
    .mixed()
    .oneOf(
      YES_NO_ARRAY_CHOICES,
      'El Obligado a Llevar Contabilidad debe ser elegido',
    )
    .required('El campo Obligado a Llevar Contabilidad es requerido'),

  logo_1_url: yup
    .string()
    .required('El campo URL del primer logotipo es requerido')
    .max(
      400,
      'El campo URL del primer logotipo no debe exceder los 400 caracteres',
    ),
  logo_2_url: yup
    .string()
    .required('El campo URL del segundo logotipo es requerido')
    .max(
      400,
      'El campo URL del segundo logotipo no debe exceder los 400 caracteres',
    ),
  mobile: yup
    .string()
    .required('El campo Teléfono celular es requerido')
    .max(10, 'El campo Teléfono celular no debe exceder los 200 caracteres'),
  phone: yup
    .string()
    .required('El campo Teléfono convencional es requerido')
    .max(9, 'El campo Teléfono convencional no debe exceder los 9 caracteres'),
  email: yup
    .string()
    .required('El campo Email Emisor es requerido')
    .max(50, 'El campo Email no debe exceder los 50 caracteres'),
  website: yup
    .string()
    .required('El campo Dirección de página web es requerido')
    .max(
      13,
      'El campo Dirección de página web no debe exceder los 13 caracteres',
    ),
  description: yup
    .string()
    .required('El campo Descripción es requerido')
    .max(200, 'El campo Descripción no debe exceder los 200 caracteres'),
  url_oficina_virtual_aceptacion: yup
    .string()
    .required('El campo Url oficina virtual aceptacion es requerido')
    .max(
      200,
      'El campo Url oficina virtual aceptacion no debe exceder los 200 caracteres',
    ),
});
