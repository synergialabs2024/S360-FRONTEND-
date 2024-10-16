import * as yup from 'yup';

////* Auth
const passwordYupValidation = yup
  .string()
  .required('La contraseña es requerida')
  .min(5, 'Min 5 caracteres')
  .max(45, 'Max 45 caracteres');

export const loginFormSchema = yup.object({
  username: yup.string().required('El nombre de usuario es requerido'),
  password: passwordYupValidation,
  // empresa: yup.string().required('La empresa es requerida'),
});
