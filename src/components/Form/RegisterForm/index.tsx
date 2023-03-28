import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema } from './registerFormSchema';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { IUserRegister } from '../../../providers/@types';
import { UserContext } from '../../../providers/UserContext';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserRegister>({
    resolver: yupResolver(registerFormSchema),
  });

  const { registerUser } = useContext(UserContext);

  const submit: SubmitHandler<IUserRegister> = (formData: IUserRegister) => {
    registerUser(formData);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)} noValidate>
      <>
        <Input
          label='Nome'
          type='text'
          register={register('name')}
          error={errors.name}
        />
        <Input
          label='Email'
          type='email'
          register={register('email')}
          error={errors.email}
        />
        <Input
          label='Senha'
          type='password'
          register={register('password')}
          error={errors.password}
        />
        <Input
          label='Confirmar Senha'
          type='password'
          register={register('confirmPassword')}
          error={errors.confirmPassword}
        />
        <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
          Cadastrar
        </StyledButton>
      </>
    </StyledForm>
  );
};
export default RegisterForm;
