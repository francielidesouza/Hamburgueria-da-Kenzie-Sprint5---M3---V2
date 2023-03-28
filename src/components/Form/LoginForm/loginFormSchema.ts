import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('O e-mail digitado é inválido'),

  password: yup.string().required('A senha é obrigatória'),
});
