import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);
	const currentUser = useSelector(selectCurrentUser);

	const toggleIsCartOpen = () => {
		if (currentUser) dispatch(setIsCartOpen(!isCartOpen))
		else alert('Please sign in to see your cart items')
	};

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{currentUser ? cartCount : 0}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
