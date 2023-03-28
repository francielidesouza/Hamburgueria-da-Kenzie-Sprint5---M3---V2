import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  IDefaultProviderProps,
  IUserContext,
  IUserLogin,
  IUserRegister,
} from './@types';
import { api } from '../services/api';

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [user, setUser] = useState<IUserRegister | IUserLogin | null>(null);

  const navigate = useNavigate();

  const registerUser = async (formData: IUserRegister) => {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await api.post('/users', data);
      setUser(response.data);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar o cadastro');
    }
  };

  const loginUser = async (formData: IUserLogin) => {
    try {
      const response = await api.post('/login', formData);
      setUser(response.data);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      toast.success('Login realizado com sucesso!');
      navigate('/shop');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar o login');
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    navigate('/');
  };

  const autoLoginUser = async () => {
    const userToken = localStorage.getItem('@TOKEN');

    if (userToken) {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUser(response.data);
        navigate('/shop');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    autoLoginUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
