import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ICartContext,
  IDefaultProviderProps,
  IProduct,
  IProductCart,
} from './@types';
import { api } from '../services/api';

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);
  const [openModalCart, setOpenModalCart] = useState(false);
  const localStorageHamburguer = localStorage.getItem('@HAMBURGUER');

  const [currentSale, setCurrentSale] = useState<IProductCart[]>(
    localStorageHamburguer ? JSON.parse(localStorageHamburguer) : []
  );
  const [search, setSearch] = useState('');

  const loadCartProducts = async () => {
    try {
      const token = localStorage.getItem('@TOKEN');
      setLoading(true);
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('@HAMBURGUER', JSON.stringify(currentSale));
  }, [currentSale]);

  const addProductToCart = (productToAdd: IProduct) => {
    if (currentSale.includes(productToAdd)) {
      toast.warn('Este produto já foi adicionado ao carrinho');
    } else {
      toast.success('Produto adicionado ao carrinho');
      setCurrentSale([...currentSale, productToAdd]);
    }
  };

  const removeProductToCart = (productId: number) => {
    const productRemove = currentSale.filter(
      (productToRemove) => productToRemove.id !== productId
    );
    toast.success('Produto removido do carrinho');
    setCurrentSale(productRemove);
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        setLoading,
        products,
        setProducts,
        currentSale,
        loadCartProducts,
        setCurrentSale,
        addProductToCart,
        removeProductToCart,
        openModalCart,
        setOpenModalCart,
        search,
        setSearch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
