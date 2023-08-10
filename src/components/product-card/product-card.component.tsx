import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCardContainer, Footer } from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.types';
import { ProductCardPopup } from '../../utils/popup/popup';

type ProductCardProps = {
  product: CategoryItem;
  ownCategory?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({ product, ownCategory }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const addProductToCard = () => {
    if (currentUser) dispatch(addItemToCart(cartItems, product));
    else {
      ProductCardPopup.show();
    }
  };

  return (
    <ProductCardContainer ownCategory={ownCategory}>
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
    </ProductCardContainer>
  );
};

export default ProductCard;
