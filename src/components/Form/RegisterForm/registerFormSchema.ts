import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),

  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),

  password: yup
    .string()
    .required('A senha é obrigatória')
    .matches(/(\d)/, 'Deve conter ao menos 1 número')
    .matches(/([a-zA-Z])/, 'Deve conter ao menos 1 letra')
    .matches(/(\W|_)/, 'Deve conter ao menos 1 caracter especial')
    .matches(/.{6,}/, 'Deve conter no mínimo 6 caracteres'),

  confirmPassword: yup
    .string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não correspondem'),
});
