export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserContext {
  user: IUserRegister | IUserLogin | null;
  registerUser: (formData: IUserRegister) => Promise<void>;
  loginUser: (formData: IUserLogin) => Promise<void>;
  logoutUser: () => void;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface IProductCart {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface ICartContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  currentSale: IProductCart[];
  setCurrentSale: React.Dispatch<React.SetStateAction<IProductCart[]>>;
  addProductToCart: (productToAdd: IProduct) => void;
  removeProductToCart: (productId: number) => void;
  loadCartProducts: () => Promise<void>;
  openModalCart: boolean;
  setOpenModalCart: (value: React.SetStateAction<boolean>) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
