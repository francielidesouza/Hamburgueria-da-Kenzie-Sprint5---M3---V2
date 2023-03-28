import { useContext } from 'react';
import { StyledProductList } from './style';
import ProductCard from './ProductCard';
import { IProduct } from '../../providers/@types';
import { CartContext } from '../../providers/CartContext';

const ProductList = () => {
  const { products, addProductToCart } = useContext(CartContext);

  return (
    <StyledProductList>
      {products.map((product: IProduct) => (
        <ProductCard
          key={product.id}
          product={product}
          addProductToCart={addProductToCart}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
