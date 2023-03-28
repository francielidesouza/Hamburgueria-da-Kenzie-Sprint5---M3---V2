import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext } from '../../../../providers/CartContext';
import { IProductCart } from '../../../../providers/@types';

interface IProductCartProps {
  product: IProductCart;
}

const CartProductCard = ({ product }: IProductCartProps) => {
  const { removeProductToCart } = useContext(CartContext);
  return (
    <StyledCartProductCard key={product.id}>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeProductToCart(product.id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
