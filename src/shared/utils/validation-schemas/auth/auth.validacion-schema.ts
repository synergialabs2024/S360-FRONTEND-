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

export const passwordYupValidation2 = yup
  .string()
  .required('La contraseña es requerida')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.]{8,}$/,
    'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (.,!@#$%^&*)',
  );
