import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';

import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { currentSale, setCurrentSale } = useContext(CartContext);

  const total = currentSale.reduce(
    (valueProduct, totalProducts) => valueProduct + totalProducts.price,
    0
  );
  return (
    <StyledCartProductList>
      <ul>
        {currentSale.map((product) => (
          <CartProductCard key={product.id} product={product} />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => setCurrentSale([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
