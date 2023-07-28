import { useState, MouseEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
import { setIsCartOpen } from '../../store/cart/cart.action';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  DisplayName,
} from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [showName, setShowName] = useState(false);

  const toggleName = (event: MouseEvent) => {
    event.preventDefault();
    setShowName(true);
    setTimeout(() => {
      setShowName(false);
    }, 2000);
  };

  const signOutUser = () => {
    dispatch(signOutStart());
    dispatch(setIsCartOpen(false));
    setTimeout(() => {
      navigate('/auth');
    }, 10);
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrownLogo className='logo' />
          {currentUser?.displayName && (
            <DisplayName
              showName={showName}
              onClick={event => toggleName(event)}>
              <span className='material-icons'>account_circle</span>
              <span className='name'>{currentUser.displayName}</span>
            </DisplayName>
          )}
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        <CartDropdown />
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
