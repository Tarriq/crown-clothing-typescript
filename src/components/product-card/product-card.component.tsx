import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCardCoantainer, Footer } from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
	product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const addProductToCard = () => {
    if (currentUser) dispatch(addItemToCart(cartItems, product));
    else {
      window.confirm(
        'You Must Sign In To Purchase Items, Go To Sign In Page?'
      ) && navigate('/auth');
    }
  };

  return (
    <ProductCardCoantainer>
      <img src={imageUrl} alt={name} loading='lazy' />
      <Footer>
        <span className='name'>{name}</span>
        <span className='price'>{price} $</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCard}>
        Add to cart
      </Button>
    </ProductCardCoantainer>
  );
};

export default ProductCard;
