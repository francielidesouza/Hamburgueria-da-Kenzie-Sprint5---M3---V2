import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const tokenUser = localStorage.getItem('@TOKEN');

  return tokenUser ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
